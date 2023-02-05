export default function ({ store, redirect, route }) {
  if (!store.getters['auth/authenticated'] && !route.path.includes('/auth')) {
    return redirect('/auth')
  }
}
