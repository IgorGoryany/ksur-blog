'use client';

import { useState } from 'react';
import Underline from '@tiptap/extension-underline';
import type { JSONContent } from '@tiptap/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Underline as UnderlineIcon } from 'lucide-react';

import { Separator } from './ui/separator';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { TextEditorBubbleMenu } from './TextEditorBubbleMenu';

export const TextEditorPage = () => {
  const [content, setContent] = useState<JSONContent>(JSON.parse(localStorage?.getItem('content') || '{}'));
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
        HTMLAttributes: {
          class: 'mb-4'
        }
      }
    }), Underline],
    content,
    autofocus: true,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setContent(json);
      localStorage.setItem('content', JSON.stringify(json));
    }
  });
  const floatingMenuValue = [];

  if (editor?.isActive('bold')) floatingMenuValue.push('Bold');
  if (editor?.isActive('italic')) floatingMenuValue.push('Italic');
  if (editor?.isActive('underline')) floatingMenuValue.push('Underline');

  const headingValue = editor?.isActive('heading', { level: 1 }) ? '1' : editor?.isActive('heading', { level: 2 }) ? '2' : editor?.isActive('heading', { level: 3 }) ? '3' : undefined;

  return (
    <div className="px-40">
      <EditorContent
        editor={editor}
      />
      <TextEditorBubbleMenu
        editor={editor}
        tippyOptions={{
          placement: 'top'
        }}
      >
        <ToggleGroup type="single" size="sm" value={headingValue}>
          <ToggleGroupItem value="1" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
            H1
          </ToggleGroupItem>
          <ToggleGroupItem value="2" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
            H2
          </ToggleGroupItem>
          <ToggleGroupItem value="3" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
            H3
          </ToggleGroupItem>
        </ToggleGroup>
        <Separator orientation="vertical" />
        <ToggleGroup type="multiple" size="sm" value={floatingMenuValue}>
          <ToggleGroupItem value="Bold" onClick={() => editor?.chain().focus().toggleBold().run()}>
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="Italic" onClick={() => editor?.chain().focus().toggleItalic().run()}>
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="Underline" onClick={() => editor?.chain().focus().toggleUnderline().run()}>
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </TextEditorBubbleMenu>
    </div>
  );
};
