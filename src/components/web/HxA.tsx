const HxA = ({ url, children }: { url: string, children: any }) => {
    return (
        <a hx-target="#main" hx-push-url="true" hx-indicator="#page-loading"
            hx-get={url} class="cursor-pointer hover:underline p-0 m-0 flex">
            {children}
        </a>
    )
}

export default HxA;