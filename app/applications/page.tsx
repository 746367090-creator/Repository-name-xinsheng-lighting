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

  const category = searchParams.category || "";

  const [page, caseEntries, guideEntries, scenes] = await Promise.all([
    getPage("applications"),
    getContentEntries("case"),
    getContentEntries("solution"),
    getGallery("scene")
  ]);

  const entries =
    category==="case"
    ? caseEntries
    : category==="guides"
    ? guideEntries
    : [];


  return (
    <>
    <section className="application-hero section">

      <div className="container">


        


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
<img src={String((page?.content as any)?.application_image_1 || "")} alt="OEM ODM Development"/>
</div>
<h3>{String((page?.content as any)?.application_title_1 || "OEM / ODM Development")}</h3>
<p>
From concept development to mass production,
we support customized lighting projects.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_2 || "")} alt="Custom Lighting Solutions"/>
</div>
<h3>{String((page?.content as any)?.application_title_2 || "Custom Lighting Solutions")}</h3>
<p>
Product design, packaging and private label
solutions for global brands.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_3 || "")} alt="Quality Control"/>
</div>
<h3>{String((page?.content as any)?.application_title_3 || "Quality Control")}</h3>
<p>
Inspection and production management
throughout the manufacturing process.
</p>
</div>


<div className="capability-card">
<div className="capability-image">
<img src={String((page?.content as any)?.application_image_4 || "")} alt="Global Supply Support"/>
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
category
?
(
category==="scenes"
?
<div className="scene-page-grid">
{scenes.map(scene=>
<article className="scene-card scene-card-large" key={scene.id}>
{scene.media_type==="video"
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
)

:

<>
<section className="section">
<div className="application-section-head">
<h2>Project Cases</h2>
<p>Real projects delivered for global brands with customized LED lighting solutions.</p>
</div>
<ContentGrid
items={caseEntries.slice(0,3)}
base="/applications/cases"
/>
<Link className="application-view-all" href="/applications?category=case">
View All Cases →
</Link>
</section>


<section className="section">
<div className="application-section-head">
<h2>Application Guides</h2>
<p>Insights for lighting buyers, importers and sourcing teams.</p>
</div>
<ContentGrid
items={guideEntries.slice(0,3)}
base="/solutions"
/>
<Link className="application-view-all" href="/applications?category=guides">
View All Guides →
</Link>
</section>


<section className="section">
<div className="application-section-head">
<h2>Lighting Scenes</h2>
<p>Explore LED lighting solutions across different applications and markets.</p>
</div>

<div className="scene-page-grid">
{scenes.slice(0,3).map(scene=>
<article className="scene-card scene-card-large" key={scene.id}>
<img src={scene.media_url} alt={scene.title}/>
<div className="scene-overlay">
<h2>{scene.title}</h2>
<p>{scene.caption}</p>
</div>
</article>
)}
</div>

<Link className="application-view-all" href="/applications?category=scenes">
View All Scenes →
</Link>

</section>
</>
}

      </div>

    </section>


    <ProjectCTA
  title="Need a custom lighting solution?"
  description="From product development to mass production, XINSHERN supports global brands with OEM/ODM services, customization and reliable manufacturing solutions."
  button="Request OEM Quote"
  href="/contact?application=OEM%20%2F%20ODM%20Request"
/>

    </>
  );
}
