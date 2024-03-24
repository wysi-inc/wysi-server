import { Elysia } from 'elysia'
import { verifyUser } from '../resources/functions';
import { getPage } from '../resources/pages';
import { saveSetup } from '../db/users';
import type { BeatmapCategory, Mode, ScoreCategory } from '../types/osu';
import type { ProfileMedal } from '../types/medals';
import UserPage from '../components/user/UserPage';
import UserScoresPanel from '../components/user/u_panels/UserScoresPanel';
import UserBeatmapsPanel from '../components/user/u_panels/UserBeatmapsPanel';
import UserSummaryPanel from '../components/user/u_panels/UserSummaryPanel';
import UserMostPanel from '../components/user/u_panels/UserMostPanel';
import UserSkinsPanel from '../components/user/u_panels/UserSkinsPanel';
import UserMedalsPanel from '../components/user/u_panels/UserMedalsPanel';
import UserScoresList from '../components/user/u_panels/u_components/UserScoresList';
import UserBeatmapsList from '../components/user/u_panels/u_components/UserBeatmapsList';
import UserMostList from '../components/user/u_panels/u_components/UserMostList';
import UserSetupPanel from '../components/user/u_panels/UserSetupPanel';

export const userRoutes = new Elysia({ prefix: '/users/:id' })
    //@ts-ignore
    .get("/", async ({ t, request, cookie: { auth }, params, jwt }) => {
        const user = await verifyUser(jwt, auth.value);
        return getPage(request.headers, user,
            <UserPage t={t}
                id={params.id} logged_id={user?.id} />
        )
    })
    //@ts-ignore
    .post("/setup", async ({ set, cookie: { auth }, body, jwt }) => {
        const user = await verifyUser(jwt, auth.value);
        if (!user) {
            set.status = 401;
            return "Unauthorized";
        }
        const setup = await saveSetup(user.id, body);
        if (!setup) return "Failed to save setup, reload the page and try again.";
        return <UserSetupPanel setup={setup} logged_id={user.id} page_id={user.id} />
    })
    .group("/:mode", (_) => _
        //@ts-ignore
        .get("/", async ({ t, request, cookie: { auth }, params, jwt }) => {
            const user = await verifyUser(jwt, auth.value);
            return getPage(request.headers, user,
                <UserPage t={t}
                    logged_id={user?.id}
                    id={params.id}
                    mode={params.mode as Mode} />
            )
        })
        .group("/panels", (_) => _
            .post("/scores/:category", ({ params }) => (
                <UserScoresPanel
                    id={Number(params.id)}
                    mode={params.mode as Mode}
                    category={params.category as ScoreCategory}
                />)
            )
            .post("/beatmaps/:category", ({ params }) => (
                <UserBeatmapsPanel
                    id={Number(params.id)}
                    category={params.category as BeatmapCategory}
                />
            ))
            .post("/summary", ({ params }) => (
                <UserSummaryPanel
                    id={Number(params.id)}
                    mode={params.mode as Mode}
                />
            ))
            .post("/most", ({ params }) => (
                <UserMostPanel id={Number(params.id)} />
            ))
            .post("/skins", ({ params }) => (
                <UserSkinsPanel id={Number(params.id)} />
            ))
            .post("/medals", async ({ body }) => (
                <UserMedalsPanel
                    user_medals={
                        (body as any)?.medals?.map((m: string) =>
                            JSON.parse(m) as ProfileMedal)
                    }
                />
            ))
        )
        .group("/lists", (_) => _
            .post("/scores/:category", ({ params, query }) => (
                <UserScoresList
                    id={Number(params.id)}
                    mode={params.mode as Mode}
                    category={params.category as ScoreCategory}
                    offset={Number(query.offset)}
                    limit={Number(query.limit)}
                />
            ))
            .post("/beatmaps/:category", ({ params, query }) => (
                <UserBeatmapsList
                    id={Number(params.id)}
                    category={params.category as BeatmapCategory}
                    offset={Number(query.offset)}
                    limit={Number(query.limit)}
                />
            ))
            .post("/most", ({ params, query }) => (
                <UserMostList
                    id={Number(params.id)}
                    offset={Number(query.offset)}
                    limit={Number(query.limit)}
                />
            ))
        )
    )
