import { execSync } from 'child_process'
import readline from 'readline'

// 1. 创建交互式输入对象
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 2. 工具函数：执行 Git 命令（同步，带异常捕获）
function runGitCmd(command, errorMsg, options = { stdio: 'inherit' }) {
  try {
    const result = execSync(command, options)
    if (!result) return ''
    return result.toString().trim()
  } catch (err) {
    console.error(`\n❌ ${errorMsg}`)
    console.error(`错误详情：${err.message.slice(0, 150)}`)
    process.exit(1)
  }
}

// 3. 工具函数：校验版本号格式（vX.Y.Z，支持可选 beta/alpha 后缀）
function validateVersion(version) {
  const regex = /^v\d+\.\d+\.\d+(-beta\.\d+|-alpha\.\d+)?$/ // 支持 v1.0.0、v0.1.0-beta.1
  if (!regex.test(version)) {
    console.error(`\n❌ 版本号格式错误！需符合 "vX.Y.Z" 或 "vX.Y.Z-beta.1" 规范（如 v1.0.0）`)
    process.exit(1)
  }
  return version
}

// 4. 新增：校验当前分支是否为 dev（非 dev 则终止）
function checkCurrentBranchIsDev() {
  console.log('\n🔍 正在校验当前分支...')
  const currentBranch = runGitCmd(
    'git rev-parse --abbrev-ref HEAD',
    '获取当前分支失败！请检查 Git 仓库配置',
    { stdio: 'pipe' }, // 不打印分支名，仅获取结果
  )

  if (currentBranch !== 'dev') {
    console.error(`\n❌ 仅允许在 dev 分支执行预发布流程！当前分支：${currentBranch}`)
    console.error('👉 请先切换到 dev 分支：git checkout dev')
    process.exit(1)
  }
  console.log(`✅ 当前分支为 dev，校验通过`)
}

// 5. 工具函数：手动输入版本号
function getVersionByInput() {
  return new Promise((resolve) => {
    rl.question('\n请输入预发布版本号（格式：vX.Y.Z，如 v1.0.0）：', (input) => {
      rl.close()
      const version = validateVersion(input.trim())
      resolve(version)
    })
  })
}

// 6. 工具函数：自动递增版本号（支持首次 release 自定义初始化版本）
function getVersionAutoIncrement() {
  return new Promise((resolve) => {
    try {
      console.log('\n🔍 正在读取远程 release 分支列表...')
      runGitCmd('git fetch origin', '拉取远程分支失败！请检查网络或 Git 配置')

      const remoteBranches = runGitCmd(
        'git branch -r --list "origin/release/v*"',
        '获取远程 release 分支列表失败！',
        { stdio: 'pipe' },
      )

      // 首次创建 release 分支：支持默认/自定义初始化版本
      if (!remoteBranches) {
        console.log('\nℹ️  未找到任何远程 release 分支，即将创建第一个 release 版本！')
        const initRl = readline.createInterface({ input: process.stdin, output: process.stdout })
        initRl.question(
          '请选择初始化版本：\n1. 使用默认版本 v1.0.0\n2. 自定义初始化版本（格式：vX.Y.Z）\n输入 1 或 2：',
          (initChoice) => {
            initRl.close()
            if (initChoice === '1') {
              console.log('✅ 已选择默认初始化版本：v1.0.0')
              resolve('v1.0.0')
            } else if (initChoice === '2') {
              const customRl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
              })
              customRl.question('请输入自定义初始化版本（格式：vX.Y.Z）：', (customVersion) => {
                customRl.close()
                const validatedVersion = validateVersion(customVersion.trim())
                console.log(`✅ 已确认自定义初始化版本：${validatedVersion}`)
                resolve(validatedVersion)
              })
            } else {
              console.warn('⚠️  无效选择，默认使用 v1.0.0')
              resolve('v1.0.0')
            }
          },
        )
      } else {
        // 已有 release 分支：自动递增修订号
        const versions = remoteBranches
          .split('\n')
          .map((branch) => branch.trim().replace('origin/release/', ''))
          .filter((version) => validateVersion(version))

        // 按版本号降序排序（取最新版本）
        const sortedVersions = versions.sort((a, b) => {
          const aParts = a.slice(1).split(/[.-]/).map(Number) // 处理 v1.0.0-beta.1 → [1,0,0,1]
          const bParts = b.slice(1).split(/[.-]/).map(Number)
          for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            if (aParts[i] !== bParts[i]) {
              return bParts[i] - aParts[i]
            }
          }
          return 0
        })
        const latestVersion = sortedVersions[0]
        console.log(`ℹ️  找到最新远程 release 版本：${latestVersion}`)

        // 修订号递增（如 v1.0.0 → v1.0.1，v0.9.9-beta.1 → v0.9.10-beta.1）
        const versionParts = latestVersion.slice(1).split('.')
        const patchPart = versionParts.pop().split('-')[0] // 提取修订号（处理 beta 后缀）
        const newPatch = Number(patchPart) + 1
        const suffix = latestVersion.includes('-') ? '-' + latestVersion.split('-')[1] : '' // 保留后缀
        const newVersion = `v${versionParts.join('.')}.${newPatch}${suffix}`
        console.log(`ℹ️  自动生成新版本号：${newVersion}`)
        resolve(newVersion)
      }
    } catch (err) {
      console.error(`\n❌ 自动生成版本号失败！${err.message.slice(0, 100)}`)
      process.exit(1)
    }
  })
}

// 7. 主流程：分支校验 → 版本选择 → 创建分支 → 合并 → 自动切回 dev
async function main() {
  console.log('🚀 开始预发布分支创建流程（目标：合并 dev 到 release 分支）')

  // 步骤1：先校验当前分支是否为 dev（非 dev 直接终止）
  checkCurrentBranchIsDev()

  // 步骤2：选择版本号生成方式
  rl.question(
    '\n请选择版本号生成方式：\n1. 手动输入版本号\n2. 自动递增（基于远程最新 release 版本）\n输入 1 或 2：',
    async (choice) => {
      rl.close()
      let releaseVersion

      // 步骤3：获取版本号
      if (choice === '1') {
        releaseVersion = await getVersionByInput()
      } else if (choice === '2') {
        releaseVersion = await getVersionAutoIncrement()
      } else {
        console.error('❌ 无效选择！只能输入 1 或 2')
        process.exit(1)
      }

      const releaseBranch = `release/${releaseVersion}`
      let shouldSwitchBackDev = true // 标记是否需要切回 dev（默认需要）

      try {
        // 步骤4：检查本地是否已存在该 release 分支
        const localBranches = runGitCmd('git branch --list', '获取本地分支列表失败！', {
          stdio: 'pipe',
        })
        if (localBranches.includes(releaseBranch)) {
          console.error(
            `\n❌ 本地已存在分支 ${releaseBranch}！请删除后重试：git branch -D ${releaseBranch}`,
          )
          process.exit(1)
        }

        // 步骤5：拉取 dev 最新代码（确保合并的是最新内容）
        console.log(`\n📥 正在拉取 dev 分支最新代码...`)
        runGitCmd('git pull origin dev', '拉取 dev 最新代码失败！')

        // 步骤6：创建并切换到 release 分支
        console.log(`\n🌿 正在创建并切换到分支 ${releaseBranch}...`)
        runGitCmd(`git checkout -b ${releaseBranch}`, `创建分支 ${releaseBranch} 失败！`)

        // 步骤7：合并 dev 分支（基于最新 dev 创建，理论无冲突，有冲突需手动解决）
        console.log(`\n🔗 正在合并 dev 分支到 ${releaseBranch}...`)
        runGitCmd(
          'git merge dev',
          `合并 dev 到 ${releaseBranch} 失败！请手动解决冲突后执行：git status（解决后需手动切回 dev）`,
        )

        // 步骤8：推送 release 分支到远程（可选）
        console.log(`\n🚀 是否将 ${releaseBranch} 推送到远程？（y/n）`)
        const pushRl = readline.createInterface({ input: process.stdin, output: process.stdout })
        pushRl.question('', (pushChoice) => {
          pushRl.close()
          if (pushChoice.toLowerCase() === 'y') {
            runGitCmd(`git push origin ${releaseBranch}`, `推送 ${releaseBranch} 到远程失败！`)
            console.log(`\n✅ 已成功推送分支：origin/${releaseBranch}`)
          } else {
            console.log(`\nℹ️  已在本地创建分支：${releaseBranch}（未推送远程）`)
          }

          // 步骤9：自动切回 dev 分支（核心优化点）
          console.log(`\n🔄 正在自动切回 dev 分支...`)
          runGitCmd('git checkout dev', `自动切回 dev 分支失败！请手动切换：git checkout dev`)
          console.log(`\n🎉 预发布流程全部完成！当前分支已切回：dev`)
        })
      } catch (err) {
        // 异常场景：若未切换到 release 分支，则无需切回
        const currentBranch = runGitCmd('git rev-parse --abbrev-ref HEAD', '获取当前分支失败！', {
          stdio: 'pipe',
        })
        if (currentBranch !== releaseBranch) {
          shouldSwitchBackDev = false
        }

        console.error(`\n❌ 预发布流程异常终止：${err.message.slice(0, 150)}`)
        if (shouldSwitchBackDev) {
          console.log(`\n🔄 正在自动切回 dev 分支...`)
          runGitCmd('git checkout dev', `自动切回 dev 分支失败！请手动切换：git checkout dev`)
        }
        process.exit(1)
      }
    },
  )
}

// 启动主流程
main()
