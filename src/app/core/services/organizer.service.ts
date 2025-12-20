import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Organizer, OrganizersResponse, FollowResponse, FollowingStatus, MyFollowingResponse } from '../models/organizer.model';

// Extend the model to include OrganizerDetails locally if needed or import if separately defined
// Since I forgot to add OrganizerDetails in the previous file, I will add it via a separate edit or just include it here if the compiler complains, 
// but for now I will assume I can update the model file or just define it here to be safe if I can't double-tool call nicely.
// Wait, I missed OrganizerDetails in the previous write_model step but it was in the plan. 
// I will re-emit the model file via replace or just add it here for now to avoid breaking flow.
// Actually, I'll update the model file first to be clean.

export interface OrganizerDetails extends Organizer {
  email: string;
  recent_tournaments: any[]; // Using any for Tournament to avoid circular dependency or extensive imports for now
}

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {
  private apiUrl = `${environment.apiUrl}/organizers`;

  constructor(private http: HttpClient) {}

  getOrganizers(params?: { featured?: boolean; badge?: string; sort?: string; page?: number; limit?: number; search?: string }): Observable<OrganizersResponse> {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.featured) httpParams = httpParams.set('featured', 'true');
      if (params.badge) httpParams = httpParams.set('badge', params.badge);
      if (params.sort) httpParams = httpParams.set('sort', params.sort);
      if (params.page) httpParams = httpParams.set('page', params.page);
      if (params.limit) httpParams = httpParams.set('limit', params.limit);
      if (params.search) httpParams = httpParams.set('search', params.search);
    }

    return this.http.get<OrganizersResponse>(this.apiUrl, { params: httpParams });
  }

  getOrganizer(id: number): Observable<{ organizer: OrganizerDetails }> {
    return this.http.get<{ organizer: OrganizerDetails }>(`${this.apiUrl}/${id}`);
  }

  followOrganizer(id: number): Observable<FollowResponse> {
    return this.http.post<FollowResponse>(`${this.apiUrl}/${id}/follow`, {});
  }

  checkFollowingStatus(id: number): Observable<FollowingStatus> {
    return this.http.get<FollowingStatus>(`${this.apiUrl}/${id}/check-following`);
  }

  getMyFollowing(): Observable<MyFollowingResponse> {
    return this.http.get<MyFollowingResponse>(`${this.apiUrl}/my/following`);
  }
}
