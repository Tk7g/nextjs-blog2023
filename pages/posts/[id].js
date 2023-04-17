import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from '../../components/date'
import utilStyle from '../../styles/utils.module.css'
import { useRouter } from "next/router"
export async function getStaticProps({ params }){
    // params.id = ['a', 'b', 'c']
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}
export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false    }
}
export default function Post( { postData }) {
   const router = useRouter();

    // If the page is not yet generated, this will be displayed
    // initially until getStaticProps() finishes running
    if (router.isFallback) {
        return <div>Loading ...</div>
    } 
    return (<Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyle.headingXl}>{postData.title}</h1>       
        <div className={utilStyle.lightText}><Date dateString={postData.date} />
        </div>        
        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
        </article>
       
    </Layout>)
}