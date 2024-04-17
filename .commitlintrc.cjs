module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['chore', 'docs', 'feat', 'fix', 'refactor', 'test']]
  },
  prompt: {
    questions: {
      type: {
        description: '请选择提交类型',
        enum: {
          feat: {
            description: '新功能',
            title: 'Features',
            emoji: '✨'
          },
          fix: {
            description: '修复bug',
            title: 'Bug Fixes',
            emoji: '🐛'
          },
          docs: {
            description: '修改文档',
            title: 'Documentation',
            emoji: '📚'
          },
          refactor: {
            description: '代码重构，不添加新功能，也不修复bug',
            title: 'Code Refactoring',
            emoji: '📦'
          },
          test: {
            description: '测试相关',
            title: 'Tests',
            emoji: '🚨'
          },
          chore: {
            description: '与src无关的变动，如构建、工程依赖、工具',
            title: 'Chores',
            emoji: '♻️'
          }
        }
      },
      scope: {
        description: '变动影响范围'
      },
      subject: {
        description: '简述变动内容'
      },
      body: {
        description: '详细描述变动内容'
      },
      isBreaking: {
        description: '是否涉及破坏性修改'
      },
      breakingBody: {
        description: '详细描述变动内容'
      },
      breaking: {
        description: '描述该破坏性变动'
      },
      isIssueAffected: {
        description: '是否影响已存在的issue'
      },
      issuesBody: {
        description: '详细描述变动内容'
      },
      issues: {
        description: '添加issue标注（如"fix #123", "re #123"）'
      }
    }
  }
}
