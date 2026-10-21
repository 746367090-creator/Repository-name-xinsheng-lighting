import Link from "next/link";
import type {ContentEntry} from "@/lib/types";

export default function ContentGrid({
  items,
  base
}:{
  items:ContentEntry[];
  base:string;
}){

return (

<div className="case-grid">

{items.map(x=>

<Link
className="case-card"
href={`${base}/${x.slug}`}
key={x.id}
>

<div className="case-card-image">

{x.cover_url
?
<img
src={x.cover_url}
alt={x.title}
/>
:
<div className="case-placeholder">
✦
</div>
}

</div>


<div className="case-card-body">

<small>
{x.category || x.type}
</small>

<h2>
{x.title}
</h2>

<p>
{x.excerpt}
</p>

<span>
View Case →
</span>

</div>

</Link>

)}

</div>

);

}
