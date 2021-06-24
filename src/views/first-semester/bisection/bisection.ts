import { Vue, Component } from 'vue-property-decorator'
import FooterComponent from '@/components/footer/footer.vue'

@Component({
  components: {
    'breadcrumb-footer': FooterComponent
  }
})
export default class BisectionPage extends Vue {

}
