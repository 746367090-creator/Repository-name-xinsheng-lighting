import Link from "next/link";
import { getContentEntries, getGallery, getPage } from "@/lib/queries";
import ContentGrid from "@/components/ContentGrid";
import SmartVideo from "@/components/SmartVideo";
import SectionHead from "@/components/SectionHead";
import ProjectCTA from "@/components/ProjectCTA";

export const metadata = {
  title:"Lighting Applications & OEM/ODM Solutions",
  description:"Explore LED lighting applications, project cases, OEM/ODM solutions and customization services from XINSHERN."
};

const categories = [
  ["case","Case"],
  ["guides","Application Guides"],
  ["scenes","Scenes"]
];

export default async function Applications({
  searchParams
}:{
  searchParams:{category?:string}
}){

  const category =
    categories.some(([key])=>key===searchParams.category)
    ? searchParams.category!
    : "case";


  const [page, entries, scenes] = await Promise.all([
    getPage("applications"),
    category !== "scenes"
      ? getContentEntries(category==="case" ? "case" : "solution")
      : Promise.resolve([]),
    category==="scenes"
      ? getGallery("scene")
      : Promise.resolve([])
  ]);


  return (
    <>
    <section className="application-hero section">

      <div className="container">


        <div className="application-tabs">
        {categories.map(([key,label])=>
          <Link
            key={key}
            href={`/applications?category=${key}`}
            className={category===key ? "active":""}
          >
            {label}
          </Link>
        )}
        </div>


        <SectionHead
          kicker="Applications & OEM/ODM Solutions"
          title={
            category==="case"
            ?"Decorative LED Lighting Applications & Custom Solutions"
            :"Lighting Applications & Solutions"
          }
          description="Helping global brands, importers and retailers develop reliable LED lighting products through OEM/ODM manufacturing, customization and quality-controlled production."
        />


        <div className="application-actions">

          <Link
          href="/products"
          className="btn-secondary"
          >
          Explore Products
          </Link>

          <Link
          href="/contact?application=OEM%20%2F%20ODM%20Request"
          className="btn-primary"
          >
          Request OEM Quote
          </Link>

        </div>


      </div>

    </section>


    <section className="section application-capabilities">

      <div className="container">

        <div className="capability-grid">

<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_1 || "/images/oem-development.jpg")} alt="OEM ODM Development"/>
</div>
<h3>{String((page?.content as any)?.application_title_1 || "OEM / ODM Development")}</h3>
<p>
From concept development to mass production,
we support customized lighting projects.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_2 || "/images/custom-lighting.jpg")} alt="Custom Lighting Solutions"/>
</div>
<h3>{String((page?.content as any)?.application_title_2 || "Custom Lighting Solutions")}</h3>
<p>
Product design, packaging and private label
solutions for global brands.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_3 || "/images/quality-control.jpg")} alt="Quality Control"/>
</div>
<h3>{String((page?.content as any)?.application_title_3 || "Quality Control")}</h3>
<p>
Inspection and production management
throughout the manufacturing process.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_4 || "/images/global-supply.jpg")} alt="Global Supply Support"/>
</div>
<h3>{String((page?.content as any)?.application_title_4 || "Global Supply Support")}</h3>
<p>
Reliable export support for distributors,
retailers and international buyers.
</p>
</div>


</div>

      </div>

    </section>


    <section className="section">

      <div className="container">

      {
      category==="scenes"
      ?
      <div className="scene-page-grid">
      {scenes.map(scene=>
        <article className="scene-card scene-card-large" key={scene.id}>
        {
        scene.media_type==="video"
        ?
        <SmartVideo src={scene.media_url} title={scene.title}/>
        :
        <img src={scene.media_url} alt={scene.title}/>
        }
        <div className="scene-overlay">
        <h2>{scene.title}</h2>
        <p>{scene.caption}</p>
        </div>
        </article>
      )}
      </div>

      :

      entries.length
      ?
      <ContentGrid
      items={entries}
      base={category==="case"?"/applications/cases":"/solutions"}
      />

      :

      <div className="empty-detail">
      Content will be published soon.
      </div>

      }

      </div>

    </section>


    <ProjectCTA />

    </>
  );
}
