export default ({ app }, inject) => {
  inject('formatDate', (date) =>
    date
      ? app.$moment(date).locale('pt-BR').format('DD/MM/YYYY hh:mm:ss')
      : date
  )
  inject('getHours', (date) =>
    date ? app.$moment(date).locale('pt-BR').format('HH:mm') : date
  )
}
