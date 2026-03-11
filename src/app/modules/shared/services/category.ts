import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = "http://localhost:8080/api/v1";

@Injectable({
  providedIn: 'root',
})
export class CategoryS {

  constructor(private http: HttpClient) { }


  /**
   *  get all categories
   * @returns 
   */
  getCategories() {
    const endpoint = `${base_url}/categories`;
    return this.http.get(endpoint);
  }


  /**
   * Post de categoria - agregar
   */

  saveCategories(body: any) {
    const endpoint = `${base_url}/categories`;
    return this.http.post(endpoint, body);
  }

  /**
   *  update categories
   */

  updateCategories(body: any, id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.put(endpoint, body);
  }

  /**
   *  delete categories
   */

  deleteCategories(id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.delete(endpoint);
  }

  /**
  *  buscar categories
  */

  getCategoriesByid(id: any) {
    const endpoint = `${base_url}/categories/${id}`;
    return this.http.get(endpoint);
  }

  getCategoriesByName(name: string) {
    const params = new HttpParams().set('name', name);
    return this.http.get(`${base_url}/categories/search`, { params });
  }


}
