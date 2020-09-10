import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { PostService } from "../services/post.service";
import { Post } from 'src/app/models/Post';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EmmiterService } from "../services/post-emmiter.service";

declare var $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  createForm: FormGroup;

  posts:Post[] = [];
  
  post:Post;
  
  loading:boolean = false;

  saving:boolean = false;

  deleted:boolean = false;

  edit:boolean = false;

  constructor(private postService:PostService, private emmiterS :EmmiterService) { 
    this.createForm = this.formGroupCreate();
   }

  ngOnInit() {
    this.fetchPosts();

    //Recibimos Post desde el Componente Hijo app-post   listo para editar
    this.emmiterS.handleChildPost.subscribe(post => {
      this.post = post;
      this.edit = true;
      this.createForm.get("title").setValue(this.post.title);
      this.createForm.get("description").setValue(this.post.body);
       window.scroll(0, 0);
      
    });

    //Recibimos Post desde el  Componente Hijo app-post cuando fue eliminado
    this.emmiterS.hadlePostDelete.subscribe(post => {        
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1);
      this.deleted=true;
      this.post = post;
      setInterval(() => { this.deleted = false; this.post = null}, 3000);
    })
  }

  
  fetchPosts(){
    this.loading = true;
    this.postService.fetchPosts()
    .subscribe(res => {
      this.posts = res;
      this.loading=false;
    }, error => { this.loading=false;})
  }


  async onSavePost(post:Post){

    if(!this.edit){
      
      if(this.createForm.valid){
        //CREATE NEW POST
        const title = this.createForm.get("title").value;
        const description = this.createForm.get("description").value;
        const post :Post = { title:title, body:description, userId:1}
        this.saving = true;
        try{
          const posted = await this.postService.createPost(post);
          this.createForm.reset();
          this.saving = false;
          this.post = posted;
          this.openModal()
          this.posts.unshift(posted)
          
        }catch(error){
          console.log(error)
          this.saving = false;
        }
      }
    }else{
      //EDIT POST ACTUAL
      
      post.title = this.createForm.get("title").value;
      post.body = this.createForm.get("description").value;
      this.saving = true;
      this.postService.updatePost(post,post.id).then(res => {
        console.log("EDITADO")
        this.edit = false;
        this.saving = false;
        this.posts[this.posts.indexOf(post)] = this.post;
        this.post = null;

        this.createForm.reset();

      }).catch(error => {
        console.log("ERROR")
        this.saving = false;
      })
      
    }

    
  }



  cancelEdit(){
    this.createForm.reset();
    this.post = null;
    this.edit = false;
  }


  //Form content

  formGroupCreate() {
    return new FormGroup({
        title: new FormControl('', [Validators.required]),
        description : new FormControl('', [Validators.required]),
    });
  }

  get title() { return this.createForm.get('title') }
  get description() { return this.createForm.get('description') }


  //MODAL 
  openModal(){ $('#modal').modal('show'); }


}
