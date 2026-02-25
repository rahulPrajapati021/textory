import moment from "moment";
import { Link } from "react-router";

export default function PublicPostList({list}) {
  return (
    <div className="p-4 space-y-2">
      {list.map(e => 
        <div key={e.id} className="bg-[#121212] hover:bg-stone-800 rounded-md px-4 py-2">
          <Link className="text-xl" to={"/post/" + e.id}>{e.title}</Link>

          <div className="flex space-x-4">
            <div>{e.category.name}</div>
            <div className="italic">
              last updated {" "}
              {moment(e.updatedAt).calendar()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


/*
author
: 
{id: 'a97f0b33-09c6-4840-8754-98c74b3a9a88', name: 'test user'}
category
: 
{id: '9ca7a15e-d271-4c85-a5b4-0c34fcd62461', name: 'category', postCount: 0}
content
: 
"<p>this is my new post please help !!!</p>"
createdAt
: 
"2025-12-30T16:54:56.342246"
id
: 
"f3551e4f-e912-4128-a3eb-0b0eddcb9786"
readingTime
: 
1
status
: 
"PUBLISHED"
tags
: 
[{…}]
title
: 
"My Second post let's see how it works"
updatedAt
: 
"2025-12-30T16:54:56.342246"
*/