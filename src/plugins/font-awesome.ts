import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import FontAwesomeIcon from "@/basics/FontAwesomeIcon.vue";

library.add(fas, faTwitter, faInstagram, faTrash, faEdit);

export { FontAwesomeIcon };
