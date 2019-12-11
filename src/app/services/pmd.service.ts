import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { Post } from '../interfaces/checklists';

@Injectable({
  providedIn: 'root'
})
export class PmdService {
  public posts: Post[] = [];
  public loaded: boolean = false;
  constructor(private storage: Storage) {}
  load(): Promise<boolean> {
    return new Promise(resolve => {
      this.storage.get('posts').then(posts => {
        if (posts != null) {
          this.posts = posts;
        }
        this.loaded = true;
        resolve(true);
      });
    });
  }
  createPost(data): void {
    this.posts.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: []
    });
    this.save();
  }

  save(): void {
    this.storage.set('posts', this.posts);
  }
  generateSlug(title): string {
    let slug = title.toLowerCase().replace(/\s+/g, '-');
    let exists = this.posts.filter(post => {
      return post.id.substring(0, slug.length) === slug;
    });
    if (exists.length > 0) {
      slug = slug + exists.length.toString();
    }
    return slug;
  }
  getPost(id): Post {
    return this.posts.find(post => post.id === id);
  }

  getAllPost() {
    return this.posts;
  }
  addItem(postId, data): void {
    this.getPost(postId).items.push({
      title: data.name,
      checked: false
    });
    this.save();
  }
}
