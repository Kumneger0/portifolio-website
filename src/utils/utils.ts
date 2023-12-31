import matter from 'gray-matter'
import cloudinary, { ResourceApiResponse, v2 } from 'cloudinary';

v2.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    secure: true
})


interface resources extends ResourceApiResponse {
    public_id: string,
    secure_url: string,
    asset_id: string

}

const getBlogContentInParallel = async (urls: {
    url: string;
    asset_id: string;
}[]) => {
    console.log(urls)

    const fetchContent = async ({ url, asset_id }: {
        url: string;
        asset_id: string;
    }) => {
        const rawMdx = await fetch(url).then(res => res.text())
        console.log(rawMdx)
        return { rawMdx, asset_id }
    }
    const allText = await Promise.allSettled(urls.map(fetchContent))
    console.log(allText)
    const blogs = allText.map((result) => result.status == 'fulfilled' ? result.value : null)
    return blogs
}


async function getAllBlogsFromCloundnary() {
    try {
        const folder: { resources: resources[], } = await cloudinary.v2.api.search('folder:blogs/*')
        const blogs = folder.resources.filter(res => res.public_id.split('.')[1]?.toLowerCase().trim() == 'mdx')
        const blogSecureUrl = blogs.map((blog) => ({ url: blog?.secure_url, asset_id: blog.asset_id }))
        return blogSecureUrl
    } catch {
        throw new Error('there was an error occured')
    }
}


async function getBlogFromCloundnary(asset_id: string) {
    let rawMdx: string | null = null
    const blog = await cloudinary.v2.api.resources_by_asset_ids(asset_id)
    if (blog.resources.length) {
        console.log(blog.resources[0])
        rawMdx = await fetch(blog.resources[0].secure_url).then(res => res.text())
    }
    return rawMdx
}


const getAllBlogs = async () => {
    const dir = `${process.cwd()}/src/blogs`
    const urls = await getAllBlogsFromCloundnary()
    const blogs = await getBlogContentInParallel(urls)
    return blogs as {
        rawMdx: string;
        asset_id: string;
    }[]
};

const getBlogBySlug = async (slug: string) => {
    const blog = await getBlogFromCloundnary(slug)
    try {
        if (blog) {
            const { data, content } = matter(blog)
            const [year, month, day] = data?.date?.split('/').map(Number)
            const date = new Date(year, month, day).toDateString()
            return { content, data: { ...data, asset_id: slug, date, author: 'Kumneger Wondimu' } }
        }

    } catch (err) {
        console.error(err)
        return { data: null, content: null }
    }
};


const getSampleRelatedArticles = async (articleToExclude?: string, limit?: number) => {
    const articles: Array<{
        title: string, content: string, data: {
            title: string,
            author: string,
            date: string
            year: number,
            month: number,
            day: number,
            asset_id: string
        }
    }> = []
    const allBlogs = await getAllBlogs()
    if (allBlogs.length) {
        allBlogs.forEach((blog) => {
            if (limit && articles.length >= limit || articleToExclude == blog.asset_id) return
            const { data: config, content } = matter(blog?.rawMdx)
            const data = config as typeof articles[number]['data']
            const [year, month, day] = data?.date?.split('/').map(Number)
            const date = new Date(year, month, day).toDateString()
            if (content) {
                articles.push({ title: blog.rawMdx.split('.')[0], content, data: { ...data, date, year, month, day, asset_id: blog.asset_id } })
            }
        })
    }
    return articles.sort((a, b) => a.data.year == b.data.year ?
        a.data.month == b.data.month ? b.data.day - a.data.day :
            b.data.month - a.data.month : b.data.year - a.data.year)
}

export { getAllBlogs, getBlogBySlug, getSampleRelatedArticles };
