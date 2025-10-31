// git-push-script.js
import { execSync } from 'child_process' // Node.js 内置模块，无需额外安装

// ==============================================
// 工具函数：执行 Git 命令并处理异常
// ==============================================
function runGitCommand(command, successTip, errorTip) {
  try {
    // 同步执行命令，输出命令执行过程（类似终端打印）
    execSync(command, { stdio: 'inherit' })
    console.log(`\n✅ ${successTip}`)
  } catch (error) {
    // 捕获命令执行失败（如 git add 报错、git cz 取消提交）
    console.error(`\n❌ ${errorTip}`)
    console.error(`错误详情：${error.message.slice(0, 100)}`) // 截取部分错误信息，避免输出过长
    process.exit(1) // 终止脚本，避免继续执行后续步骤
  }
}

// ==============================================
// 主流程：暂存 → 提交 → 推送
// ==============================================
function main() {
  console.log('🚀 开始 Git 提交推送流程...\n')

  // 1. 暂存变更（生产环境建议替换为具体文件，如 "git add src/ package.json"）
  const addCommand = 'git add .'
  runGitCommand(
    addCommand,
    '所有变更已暂存（git add .）',
    '暂存失败！可能原因：无变更/权限不足/文件被占用',
  )

  // 2. 规范提交（依赖 commitizen，需提前配置）
  const commitCommand = 'git cz' // 若用 "pnpm commit" 则替换为 "pnpm commit"
  runGitCommand(
    commitCommand,
    '提交信息填写完成',
    '提交失败！可能原因：取消了提交/ commitizen 未配置',
  )

  // 3. 动态获取当前分支名（同步执行 git 命令，提取分支名）
  let currentBranch
  try {
    // 执行 "git rev-parse --abbrev-ref HEAD" 获取分支名，去除首尾空格（避免换行符干扰）
    currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim()
    console.log(`\n🔍 当前分支：${currentBranch}`)
  } catch (error) {
    console.log('🚀❌ ~ main ~ error:', error)
    console.error('\n❌ 获取分支名失败！可能原因：不在 Git 仓库目录')
    process.exit(1)
  }

  // 4. 推送到同名远程分支（origin/当前分支）
  const pushCommand = `git push origin ${currentBranch}`
  runGitCommand(
    pushCommand,
    `推送成功！分支：origin/${currentBranch}`,
    '推送失败！可能原因：远程分支不存在/权限不足/代码冲突',
  )

  console.log('\n🎉 整个提交推送流程完成！')
}

// 启动主流程
main()
