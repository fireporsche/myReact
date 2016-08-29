/**
 * Created by Yang Jing (yangbajing@gmail.com) on 2016-08-16.
 */
import useBasename from "history/lib/useBasename";

// This helper is for setting basename on examples with minimal boilerplate. In
// an actual application, you would build a custom history to set basename.
export default function withBasename(history, dirname) {
    return useBasename(() => history)({basename: `/${dirname}`})
}
