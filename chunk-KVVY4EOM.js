import{a as I,b as v,c as P,d as k,g as T,h as E,i as j,k as U,m as D}from"./chunk-ACFF6V2L.js";import{a as M,b as B}from"./chunk-TF3IFAF4.js";import{a as L}from"./chunk-YMVYKCWO.js";import"./chunk-JBHOHJNT.js";import{a as z}from"./chunk-7QUTGPMI.js";import{d as N}from"./chunk-MA5SRXVH.js";import{Ja as d,La as h,Na as F,Pa as c,Sa as o,T as u,Ta as r,Tb as R,Ua as C,Wa as p,X as _,Xa as w,Ya as b,ab as a,fa as y,hb as S,ua as x,xa as s,ya as g}from"./chunk-362D2ZQM.js";import{f}from"./chunk-KAWQVD33.js";function V(t,m){t&1&&(o(0,"p",7),a(1,"Upload Image"),r())}function q(t,m){if(t&1&&C(0,"img",8),t&2){let i=w();b("src",i.imageUrl,x)}}function O(t,m){t&1&&(o(0,"small"),a(1,"*description is required"),r())}function Z(t,m){if(t&1&&d(0,O,2,0,"small"),t&2){let i=w();c(i.description.errors!=null&&i.description.errors.required?0:-1)}}function A(t,m){t&1&&(y(),o(0,"svg",15),C(1,"path",16)(2,"path",17),r())}function K(t,m){t&1&&a(0," Create ")}var oe=(()=>{class t{imageResizer;s3Uploader;router;constructor(i,n,e){this.imageResizer=i,this.s3Uploader=n,this.router=e}fb=u(U);form=this.fb.group({photo:this.fb.control("",{validators:[v.required]}),description:this.fb.control("",{validators:[v.required]})});get photo(){return this.form.get("photo")}get description(){return this.form.get("description")}onKeyDown(){}store=u(R);ngOnInit(){this.store.user().username||this.router.navigate(["/"]),this.store.hideFloatingButton(!0)}ngOnDestroy(){this.store.hideFloatingButton(!1),this.form.reset()}selectedFile=null;imageUrl=null;onFileSelected(i){return f(this,null,function*(){if(i.target&&i.target.files.length)if(i.target.files[0].type.match(/image\/*/)){this.selectedFile=i.target.files[0];let n=new FileReader;n.onload=e=>{this.imageUrl=e.target?.result||null},n.readAsDataURL(this.selectedFile)}else this.selectedFile=null})}triggerFileInput(){document.getElementById("fileInput").click()}post=L.POST;postService=u(z);isLoading=!1;uploadFile(i){return f(this,null,function*(){if(i){let n=yield this.imageResizer.resizeImage(i,800,800);this.isLoading=!0,this.s3Uploader.uploadFile(n,this.post).then(e=>{this.postService.createPost({description:this.form.getRawValue().description,imageUrl:e}).subscribe({next:l=>{this.form.reset(),this.isLoading=!1,this.router.navigate([`/user/profile/${this.store.user().username}`])},error:l=>{console.log(l),this.isLoading=!1}})}).catch(e=>{console.log(e),this.isLoading=!1})}})}onSubmit(){return f(this,null,function*(){this.form.invalid||(this.selectedFile?yield this.uploadFile(this.selectedFile):console.log("no se encontro el archivo"))})}static \u0275fac=function(n){return new(n||t)(g(B),g(M),g(N))};static \u0275cmp=_({type:t,selectors:[["app-new-post-form"]],standalone:!0,features:[S],decls:20,vars:8,consts:[[1,"flex","flex-row","justify-center","items-center","h-dvh"],[1,"flex","flex-col","items-center","w-3/4","h-full","mt-14"],[1,"flex","w-full","justify-center","mb-10"],[1,"font-bold","text-xl","md:text-3xl"],[1,"flex","flex-col","items-center","sm:flex-row","sm:justify-center","sm:items-start","w-full","rounded-lg","h-full","sm:h-1/2","gap-5",3,"ngSubmit","formGroup"],[1,"justify-center","items-center","w-60","h-60","sm:h-80","sm:w-80","rounded-lg","flex","flex-col","border","border-gray-dark","text-gray-dark","hover:text-gray-heavy","hover:border-gray-heavy","transition","ease-in-out","duration-300","shadow-lg",3,"click"],["type","file","id","fileInput","formControlName","photo","accept","image/*","hidden","",3,"change"],[1,"font-semibol"],["alt","Logo",1,"w-full","h-full","rounded-lg","object-cover","shadow-lg",3,"src"],[1,"flex","flex-col","w-60","sm:w-1/2","items-center","sm:h-80","justify-between"],[1,"flex","flex-col","w-full","text-gray-heavy"],[1,"text-sm","font-medium","text-gray-dark","mb-2"],["type","textarea","formControlName","description","placeholder","Description",1,"form-input","h-28","rounded-lg","resize-none",3,"keydown"],[1,"h-5","text-orange","mb-2"],["type","submit",3,"disabled"],["aria-hidden","true","viewBox","0 0 100 101","fill","none","xmlns","http://www.w3.org/2000/svg",1,"inline","w-4","h-4","text-gray-dark","animate-spin","dark:text-gray-600","fill-gray-heavy"],["d","M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z","fill","currentColor"],["d","M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z","fill","currentFill"]],template:function(n,e){n&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"p",3),a(4,"New Post"),r()(),o(5,"form",4),p("ngSubmit",function(){return e.onSubmit()}),o(6,"button",5),p("click",function(){return e.triggerFileInput()}),o(7,"input",6),p("change",function(G){return e.onFileSelected(G)}),r(),d(8,V,2,0,"p",7)(9,q,1,1,"img",8),r(),o(10,"div",9)(11,"div",10)(12,"label",11),a(13,"DESCRIPTION"),r(),o(14,"textarea",12),p("keydown",function(){return e.onKeyDown()}),r(),o(15,"div",13),d(16,Z,1,1),r()(),o(17,"button",14),d(18,A,3,0,":svg:svg",15)(19,K,1,0),r()()()()()),n&2&&(s(5),h("formGroup",e.form),s(3),c(e.imageUrl?9:8),s(8),c(e.description.invalid&&(e.description.touched||e.description.dirty)?16:-1),s(),F("flex shadow-md justify-center button-full py-2 w-full ",e.form.invalid||e.isLoading?"hover:bg-black":"",""),h("disabled",e.form.invalid||e.isLoading),s(),c(e.isLoading?18:19))},dependencies:[D,T,I,P,k,E,j]})}return t})();export{oe as default};