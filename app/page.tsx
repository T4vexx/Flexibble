import { ProjectInterface } from "@/common.types"
import { fetchAllProjects } from "@/lib/actions"
import ProjectCard from "../components/ProjectCard";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";

// npx grafbase@0.24 dev

type ProjectsSearch = {
    projectSearch: {
        edges: { node: ProjectInterface }[];
        pageInfo: {
            hasPreviousPage: boolean;
            hasNextPage: boolean;
            startCursor: string;
            endCursor: string;
        }
    }
}

type SeatchParams = {
    category?: string ;
    endcursor?: string;
}

type HomeProps = {
    searchParams: SeatchParams
}

export const dynamic = 'force-dynamic'
export const dynamicParams = true
export const revalidade = 0

const Home = async ({ searchParams: { category, endcursor }}: HomeProps) => {
    const data = await fetchAllProjects(category, endcursor) as ProjectsSearch

    const projectsToDisplay = data?.projectSearch?.edges || []

    if(projectsToDisplay.length === 0) {
        return (
            <section className="flexStart flex-col paddings">
               <Categories />

                <p className="no-result-text text-center">No projects found, go create some first</p>
            </section>
        )
    }

    const pagination = data?.projectSearch?.pageInfo

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />
    
            <section className="projects-grid">
                {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
                    <ProjectCard 
                        key={node.id}
                        id={node?.id}
                        image={node?.image}
                        title={node?.title}
                        name={node?.createdBy?.name}
                        avatarUrl={node?.createdBy?.avatarUrl}
                        userId={node?.createdBy?.id}
                    />
                ) )}
            </section>

            <LoadMore 
                startCursor={pagination?.startCursor}
                endCursor={pagination?.endCursor}
                hasNextPage={pagination?.hasNextPage}
                hasPreviousPage={pagination?.hasPreviousPage}
            />
        </section>
    )
}

export default Home