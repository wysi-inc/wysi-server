import BaseHtml from "../components/BaseHtml";

export function getPage(request: Request, html: any, set: any, children: JSX.Element): Response {
    if (request.headers.has("hx-request")) {
        set.status = 200;
        set.headers['HX-Push-URL'] = request.url;
        return html(children);
    }
    return html(
        <BaseHtml>{children}</BaseHtml>
    );
}

export function htmxOnly(request: Request, html: any, children: JSX.Element): JSX.Element {
    if (!request.headers.has("hx-request")) {
        return "wrong request";
    }
    return html(children);
}

