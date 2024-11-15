import type { ComponentProps } from 'react';
import { BubbleMenu } from '@tiptap/react';

export const TextEditorBubbleMenu = (
  { editor, children, ...props }: ComponentProps<typeof BubbleMenu>
) => {
  return (
    <BubbleMenu editor={editor} {...props}>
      <div className="bg-background flex space-x-2">{children}</div>
    </BubbleMenu>
  );
};
