import{N as i,Nb as o,Rb as s,Ub as p,ha as a}from"./chunk-362D2ZQM.js";var f=(()=>{class n extends p{setSignUpUser(t){return this.http.post(`${this.apiUrl}/users/create`,t)}setLoginUser(t){return this.http.post(`${this.apiUrl}/users/login`,t)}getUserRefresh(){let t=s(),e=new o({Authorization:t||"","Content-Type":"application/json"});return this.http.get(`${this.apiUrl}/users/refresh-page`,{headers:e})}getUserList(t){return this.http.get(`${this.apiUrl}/users/search/${t}`)}getUserProfile(t){let e=s(),r=new o({Authorization:e||"","Content-Type":"application/json"});return this.http.get(`${this.apiUrl}/users/profile/${t}`,{headers:r})}followUser(t){let e=s(),r=new o({Authorization:e||"","Content-Type":"application/json"});return this.http.post(`${this.apiUrl}/users/follow`,{followingUser:t},{headers:r})}unfollowUser(t){let e=s(),r=new o({Authorization:e||"","Content-Type":"application/json"});return this.http.post(`${this.apiUrl}/users/unfollow`,{unfollowUser:t},{headers:r})}getS3Credentials(){let t=s(),e=new o({Authorization:t||"","Content-Type":"application/json"});return this.http.get(`${this.apiUrl}/users/s3-credentials`,{headers:e})}updateProfilePhoto(t){let e=s(),r=new o({Authorization:e||"","Content-Type":"application/json"});return this.http.post(`${this.apiUrl}/users/profile-photo`,{photoUrl:t},{headers:r})}static \u0275fac=(()=>{let t;return function(r){return(t||(t=a(n)))(r||n)}})();static \u0275prov=i({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();export{f as a};
