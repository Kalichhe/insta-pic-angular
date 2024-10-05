import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.secret
    );
  }

  async uploadFile(file: File, userName: string, fileName: string, bucket: string) {
    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(`${userName}/${fileName}`, file);

    if (error) {
      throw error;
    }

    const { data } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(`${userName}/${fileName}`);
    return data.publicUrl;
  }
}
