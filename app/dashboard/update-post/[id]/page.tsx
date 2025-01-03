'use client';

import { createClient } from '@/utils/supabase/client';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import imageCompression from "browser-image-compression";
import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter, usePathname } from 'next/navigation';

const supabase = createClient();

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const postId = pathname.split('/').pop();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(user);
      }
    };

    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('id', postId)
          .single();
        if (error) {
          console.error('Error fetching post:', error.message);
        } else {
          setFormData(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUser();
    fetchPost();
  }, [postId]);

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError('Please select an image');
      return;
    }

    setImageUploadError(null);
    try {

        const  compressfile = await imageCompression(file, {
            maxSizeMB: 0.2,
          });
           setFile((prevFile) => {
              return compressfile;
            });
    
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('post') // Your Supabase bucket name
        .upload(fileName, file);

      if (error) {
        setImageUploadError('Image upload failed');
        console.error(error.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('post')
        .getPublicUrl(fileName);

      setFormData({ ...formData, image: publicUrlData.publicUrl });
    } catch (error) {
      setImageUploadError('Image upload failed');
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from('posts')
        .update(formData)
        .eq('id', postId);

      if (error) {
        setPublishError(error.message);
        return;
      }

      setPublishError(null);
      router.push(`/post/${data[0].slug}`);
    } catch (error) {
      setPublishError('Something went wrong');
      console.error(error.message);
    }
  };

  if (!user) {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold min-h-screen">
        Please log in to update a post.
      </h1>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update a post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            value={formData.title || ''}
            className="flex-1"
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category || ''}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
          >
            Upload Image
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          required
          value={formData.content || ''}
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
