import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { PostService } from '../../services/post.service';
import { EmmiterService } from '../../services/post-emmiter.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post:Post;
  processing : boolean = false;
  constructor(private emmiterS :EmmiterService, private postS:PostService) { }

  ngOnInit(){
    
  }

  updatePost(){
    this.emmiterS.handleChildPost.emit(this.post);
  }

  onDeletePost(){
    this.processing = true;
    this.postS.deletePost(this.post.id).then(res => {
      this.emmiterS.hadlePostDelete.emit(this.post);
      this.processing = false;
    }).catch(error => {console.log(error); this.processing = false})
  }
  

}
