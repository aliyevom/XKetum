// pages/page.tsx
import React from 'react';
import getPostMetadata from "../components/getPostMetadata";
import PostPreview from "../components/PostPreview";

const HomePage = () => {
  
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((post) => (
    <PostPreview key={post.slug} {...post} />
  ));


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {postPreviews}
      {/* Add your App component here */}
      <div className="bg-bkg text-content isolate overflow-hidden p-4 sm:p-8 grid place-items-center">
      
         
         
        </div>
      </div>
  );
};

export default HomePage;
