export default function KingMonLoading(d) {
  if (d == 'create') {
    const loading = document.createElement('div')
    loading.innerHTML = `<div class="spinner">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  </div>`
    document.getElementsByTagName('body')[0].appendChild(loading)
    loading.id = "loadings-KingMon"
  } else {
    document.getElementsByTagName('body')[0].removeChild(document.getElementById('loadings-KingMon'))
  }
}
