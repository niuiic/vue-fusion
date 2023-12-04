import type { Plugin } from 'postcss'

export const removeComment: Plugin = {
  postcssPlugin: 'remove-comment',
  Comment(comment) {
    comment.text = ''
  }
}
