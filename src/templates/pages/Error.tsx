import { AwemeList } from '../../types/API';
import MetaHelper from '../../util/metaHelper';

export function ErrorResponse(error: string): JSX.Element {
    return (
        <>
            {
            MetaHelper([
                {
                  "name": "og:title",
                  "content": `❌ ${error}`
                },
                {
                  "name": "theme-color",
                  "content": "#dd2e44"
                },
                {
                  "name": "og:description",
                  "content": "An error occurred while trying to fetch the video. Please try again later."
                },
                {
                  "name": "og:site_name",
                  "content": "fxTikTok"
                }
            ])
            }
        </>
    )
}