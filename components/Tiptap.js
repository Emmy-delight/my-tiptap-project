// 'use client'

// import { useEditor, EditorContent } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// const Tiptap = () => {
//   const editor = useEditor({
//     extensions: [StarterKit],
//     content: '<p>Hello World! 🌎️</p>',
//      editorProps: {
//      attribute : {
//       class :
//        "   "
//      },
//   },
//     immediatelyRender: false,
//   })
  

//   return( 
//     <>
//     <div>
//     <div>   
//   <EditorContent editor={editor} className='border roounded-lg p-2'/>
//   </div> 
//   </div>
//    </>
//   )
// }

// export default Tiptap
  "use client"
  import React, { useState } from 'react';
  import { useEditor, EditorContent } from '@tiptap/react';
  import StarterKit from '@tiptap/starter-kit';
  import Underline from '@tiptap/extension-underline';
  import TextAlign from '@tiptap/extension-text-align';
  import Link from '@tiptap/extension-link';
  import Image from '@tiptap/extension-image';
  
  // Toolbar Component
  const MenuBar = ({ editor }) => {
    if (!editor) {
      return null;
    }
  
    const addImage = () => {
      const url = window.prompt('Enter image URL');
      if (url) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    };
  
    const setLink = () => {
      const previousUrl = editor.getAttributes('link').href;
      const url = window.prompt('Enter URL', previousUrl);
  
      // Cancelled
      if (url === null) {
        return;
      }
  
      // Empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();
        return;
      }
  
      // Update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    };
  
    return (
      <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-t-md">
        {/* Text Formatting */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('underline') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Underline
        </button>
  
        {/* Headings */}
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('heading', { level: 1 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('heading', { level: 2 }) ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          H2
        </button>
  
        {/* Lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Bullet List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Ordered List
        </button>
  
        {/* Link and Image */}
        <button
          onClick={setLink}
          className={`px-2 py-1 rounded ${
            editor.isActive('link') ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          Link
        </button>
        <button
          onClick={addImage}
          className="px-2 py-1 rounded bg-gray-200"
        >
          Add Image
        </button>
  
        {/* Clear Formatting */}
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className="px-2 py-1 rounded bg-red-200"
        >
          Clear
        </button>
      </div>
    );
  };
  
  // Main Tiptap Editor Component
  const TiptapEditor = () => {
    const [content, setContent] = useState('');
  
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        }),
        Image.configure({
          inline: true,
          allowBase64: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: '<p>Start typing your content here...</p>',
      onUpdate: ({ editor }) => {
        const html = editor.getHTML();
        setContent(html);
      },
    });
  
    // Save content handler
    const handleSave = () => {
      // Here you would typically send the content to your backend
      console.log('Saved Content:', content);
      // Example of sending to an API
      // fetch('/api/save-content', {
      //   method: 'POST',
      //   body: JSON.stringify({ content }),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    };
  
    return (
      <div className="max-w-4xl mx-auto p-4">
        {editor && <MenuBar editor={editor} />}
        <EditorContent 
          editor={editor} 
          className="border p-4 min-h-[300px] prose max-w-none" 
        />
        <div className="mt-4">
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Content
          </button>
        </div>
      </div>
    );
  };
  
  export default TiptapEditor;