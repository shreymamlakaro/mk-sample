/* eslint-disable @next/next/no-img-element */
'use client';
import {useEffect} from 'react'
import imageCompression from "browser-image-compression";
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {POST} from './action'
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
// https://dev.to/a7u/reactquill-with-nextjs-478b
import 'react-quill-new/dist/quill.snow.css';

type FormData = {
  title?: string;
  category?: string;
  image?: string;
  content?: string;
}

export default function CreatePostPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [publishError, setPublishError] = useState<string | null>(null);
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("")
  const supabase = createClient();

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
          return compressfile; // Return the compressed file as the new state
        });

      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('post') 
        .upload(fileName, file);

      if (error) {
       
        if(error.statusCode == '413'){
          setImageUploadError(error.message);
          return;
        }
        setImageUploadError('Image upload failed');
      
        return;
      }

      const { data: urlData } = supabase.storage
        .from('post')
        .getPublicUrl(fileName);
      setFormData({ ...formData, image: urlData.publicUrl });
      setImageUploadProgress(null);
    } catch (error) {
      setImageUploadError('Something went wrong');
      setImageUploadProgress(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resp = await POST( {
        title: formData.title,
        category: formData.category,
        image: formData.image,
        content: formData.content,
         userId, 
      })

      if (!resp.success) {
        console.log('error ouccr',resp)
        setPublishError(resp.message);
        return;
      }
      setPublishError(null);
    } catch (error) {
      setPublishError('Something went wrong');
      console.error(error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
     
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }console.log(user)

      const { data: profile, error: profileError } = await supabase
        .from("users").select("*")
        .eq("email", user.user.email)
        .single();
       
      if (profileError) {
        console.error("Error fetching profile :", profileError.message);
        return;
      }
      setIsAdmin(profile?.is_admin || false);
      setUserId(profile?.id)
    };

    fetchData();
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <h1 className="text-center text-3xl my-7 font-semibold">
        You are not authorized to view this page
      </h1>
    );
  }

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
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
          onChange={(value) =>
            setFormData({ ...formData, content: value })
          }
        />
        <Button type="submit" gradientDuoTone="purpleToPink"
        className="bg-blue-500 hover:bg-blue-700">
          Publish
        </Button>
      </form>
    </div>
  );
}
