import{a as H,b as K,c as B}from"./chunk-DMHFH6UV.js";import{c as O}from"./chunk-7ZP25VSS.js";import{a as Q}from"./chunk-RO4JG6DJ.js";import"./chunk-OARA3AYC.js";import{$a as b,Ja as u,La as h,Na as w,Pa as f,Qa as P,Ra as V,Sa as s,T as y,Ta as r,Ua as m,Va as C,Wa as _,X as g,Xa as c,Za as E,_a as S,ab as T,da as d,ea as p,fa as x,hb as k,xa as a}from"./chunk-BMN75HSZ.js";import"./chunk-KAWQVD33.js";var D=["postCardContainer"],M=(t,l)=>l.postId;function q(t,l){if(t&1){let e=C();s(0,"button",9),_("click",function(){let o=d(e).$implicit,i=c(3);return p(i.openPostCard(o))}),m(1,"app-post-card",10),r()}if(t&2){let e=l.$implicit;a(),h("isProfileView",!1)("post",e)}}function j(t,l){if(t&1&&(s(0,"div",5),P(1,q,2,2,"button",null,M),r()),t&2){let e=c(2);a(),V(e.posts)}}function F(t,l){t&1&&(s(0,"div",6)(1,"p",11),T(2,"There aren't posts yet"),r()())}function I(t,l){t&1&&(x(),s(0,"svg",8),m(1,"path",12)(2,"path",13),r())}function A(t,l){if(t&1){let e=C();s(0,"div",3),_("scroll",function(o){d(e);let i=c();return p(i.onScroll(o))}),s(1,"div",4),u(2,j,3,0,"div",5)(3,F,3,0,"div",6),s(4,"diV",7),u(5,I,3,0,":svg:svg",8),r()()()}if(t&2){let e=c();a(2),f(e.posts.length?2:3),a(3),f(e.loadingPosts?5:-1)}}function Z(t,l){t&1&&m(0,"app-loading-screen")}var X=(()=>{class t{postService=y(Q);loadingScreen=!1;loadingPosts=!1;lastEvaluatedKey={pk:"none",sk:"none"};postCardContainer;post={username:"",postId:"",imageUrl:"",description:"",timeStamp:0,likesQuantity:0,commentsQuantity:0,initialCommentsQuantity:0};isPostCardOpen=!1;showCommentsButton=!1;openPostCard(e){this.postCardContainer.nativeElement.scrollTop=0,this.post=e,this.post.initialCommentsQuantity=e.commentsQuantity,e.description.length>75?this.post.shortDescription=H(e.description,75):this.post.shortDescription=e.description,e.commentsQuantity>0&&(this.showCommentsButton=!0),this.isPostCardOpen=!0}closePostCard(){this.isPostCardOpen=!1,this.showCommentsButton=!1}posts=[];ngOnInit(){this.loadingScreen=!0,this.postService.getAllPosts().subscribe({next:e=>{e.posts.length&&(this.posts=e.posts),e.lastEvaluatedKey&&(this.lastEvaluatedKey=e.lastEvaluatedKey),this.loadingScreen=!1},error:e=>{this.loadingScreen=!1}})}queryExecuted=!1;onScroll(e){let n=e.target;n.scrollHeight-n.scrollTop<n.clientHeight+500&&!this.queryExecuted&&this.lastEvaluatedKey.pk!="none"&&(this.loadingPosts=!0,this.queryExecuted=!0,this.postService.getAllPosts(this.lastEvaluatedKey).subscribe({next:i=>{if(i.posts.length){let v=this.posts.concat(i.posts);this.posts=v}i.lastEvaluatedKey?this.lastEvaluatedKey=i.lastEvaluatedKey:this.lastEvaluatedKey={pk:"none",sk:"none"},this.loadingScreen=!1,this.queryExecuted=!1,this.loadingPosts=!1},error:i=>{console.log(i),this.loadingScreen=!1,this.queryExecuted=!1,this.loadingPosts=!1}}))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=g({type:t,selectors:[["app-home-view"]],viewQuery:function(n,o){if(n&1&&E(D,5),n&2){let i;S(i=b())&&(o.postCardContainer=i.first)}},standalone:!0,features:[k],decls:6,vars:10,consts:[["postCardContainer",""],[1,"flex","flex-col","items-center","w-full","px-4","py-10","sm:p-16","h-dvh","overflow-y-auto"],[1,"flex","mx-5","w-11/12","sm:w-9/12","md:w-10/12","lg:w-6/12",3,"closePostDetailsEmitter","isPostCardOpen","post","showCommentsButton"],[1,"flex","flex-col","items-center","w-full","px-4","py-10","sm:p-16","h-dvh","overflow-y-auto",3,"scroll"],[1,"flex","flex-col"],[1,"grid","grid-cols-1","w-[25rem]","md:grid-cols-2","md:w-[37rem]","lg:grid-cols-3","lg:w-[55rem]","mt-10","mb-3","sm:mb-14"],[1,"flex","w-full","justify-center","mt-20"],[1,"flex","flex-col","w-full","h-16","items-center","sm:justify-center","mb-10"],["aria-hidden","true","viewBox","0 0 100 101","fill","none","xmlns","http://www.w3.org/2000/svg",1,"inline","w-5","h-5","sm:w-10","sm:h-10","text-gray-dark","animate-spin","dark:text-gray-600","fill-gray-heavy"],[3,"click"],[3,"isProfileView","post"],[1,"text-lg","md:text-xl","text-gray-dark"],["d","M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z","fill","currentColor"],["d","M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z","fill","currentFill"]],template:function(n,o){if(n&1){let i=C();u(0,A,6,2,"div",1)(1,Z,1,0,"app-loading-screen"),m(2,"div"),s(3,"div",null,0)(5,"app-post-view",2),_("closePostDetailsEmitter",function(){return d(i),p(o.closePostCard())}),r()()}n&2&&(f(o.loadingScreen?1:0),a(2),w("fixed flex mb-20 top-0 left-0 justify-center h-dvh w-full  transition ease-in-out duration-500   bg-black ",o.isPostCardOpen?"opacity-60 visible":"opacity-0 invisible",""),a(),w("fixed flex top-0 mt-5 pb-24 left-0 justify-center h-dvh w-full transition ease-in-out duration-500 overflow-y-auto ",o.isPostCardOpen?"opacity-1 visible":"opacity-0 invisible",""),a(2),h("isPostCardOpen",o.isPostCardOpen)("post",o.post)("showCommentsButton",o.showCommentsButton))},dependencies:[K,B,O]})}return t})();export{X as default};
