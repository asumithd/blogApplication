import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
restApiUrl='http://localhost:3000/blogList'
  constructor(
    private http: HttpClient
  ) { }

  addBlog(obj: any) {
    return this.http.post(this.restApiUrl+"/", obj);
  }

  getBlog() {
    return this.http.get(this.restApiUrl+"/");
  }

  updateBlog(obj: any, id: number) {
    return this.http.put(this.restApiUrl+"/" + id, obj);
  }

  deleteBlog(id: number) {
    return this.http.delete(this.restApiUrl+"/" + id);
  }

  findOneBlog(id: number) {
    return this.http.get(this.restApiUrl+"/" + id);
  }

}
