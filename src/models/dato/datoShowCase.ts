import FluidWithAlt from '../gatsby/fluidWithAlt';

type DatoShowCase = {
    id: string;
    model: { 
      apiKey: string 
    }
    layout: string;
    icon: {
        url: string;
    }
    description: string;
    linktext: string;
    linkurl: string;
    pretitle: string;
    title: string;
    image: FluidWithAlt;
};

export default DatoShowCase;