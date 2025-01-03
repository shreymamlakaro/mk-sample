"use server"
import { createClient } from '@/utils/supabase/server'; // Import your Supabase client instance
import { nanoid } from 'nanoid'; // For generating unique slugs

const supabase = createClient()
export async function POST({ title, category, content, image, userId }) {
  try {
    
    // Basic validation
    console.log(title , category,content,userId)
    if (!title || !category || !content || !userId) {
      return {success:false, message: 'Missing required fields'};
    }
    

    // Generate a unique slug
    const slug = `${title.toLowerCase().replace(/\s+/g, '-')}-${nanoid(6)}`;

    // Insert post into the database
    const {  error } = await supabase
      .from('posts')
      .insert([{ title, category, content, image, slug, user_id: userId }]);

    if (error) {
     return {success:false , message:error?.message,error}
    }

    return { success:true ,message: 'Post created successfully', slug };
  } catch (error: any) {
    console.error(error);
    return {success:false , message: 'Failed to create post' };
  }
}
