import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";
import { Post } from '../../../models/Post';

@Injectable({
    providedIn:"root"
})
export class PostService {
    

    URL:string;

    constructor(private httpClient:HttpClient ){
        this.URL = environment.BASE_URL;
    }

    
    fetchPosts():Observable<any>{
        return this.httpClient.get(this.URL+'/posts')
    }

    createPost(post:Post):Promise<any>{
        return new Promise((resolve,reject) => {
            this.httpClient.post(this.URL+'/posts',post,{headers: {"Content-type": "application/json; charset=UTF-8"}})
            .toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(error => reject(error))
        });
    }


    updatePost(post:Post, postId:number){
        return new Promise((resolve,reject) => {
            this.httpClient.put(this.URL+'/posts/'+postId,post,{headers: {"Content-type": "application/json; charset=UTF-8"}})
            .toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(error => reject(error))
        });
    }

    deletePost(postId:number){
        return new Promise((resolve,reject) => {
            this.httpClient.delete(this.URL+'/posts/'+postId)
            .toPromise()
            .then(res => {
                resolve(res);
            })
            .catch(error => reject(error))
        });
    }


}
