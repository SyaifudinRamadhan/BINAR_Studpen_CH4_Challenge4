// Abstract class
class TemplateView {
    #JSONData;
    constructor(JSONData, targetDOM){
        this.#JSONData = JSONData;
        this.target = targetDOM;
    }

    setNewJson(url, childObj){
        // Metode XHTTPRequest
        const xhttp = new XMLHttpRequest();
        xhttp.onload = () => {
            this.#setJSONData(JSON.parse(xhttp.response));
            console.log(JSON.parse(xhttp.response), 'ini hasil response');
            console.log(typeof(functionExp));
            childObj.setView();
        }
        xhttp.open('POST', url);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send();
    }

    _setTemplate(tempateString){
        this.tempateString = tempateString;
    }

    setView(){
        document.getElementById(this.target).innerHTML += this.tempateString;
    }

    setBlankView(){
        document.getElementById(this.target).innerHTML = '';
    }

    #setJSONData(newData){
        this.#JSONData = newData;
    }
    getJSONData(){
        return this.#JSONData;
    }
}

// child class / polymorpishm
class SkeletonTemplate extends TemplateView{
    #strTemplate = strTempalate();

    constructor(targetDOM){
        super([{}], targetDOM);
    };

    genTemplate(){
        super._setTemplate(this.#strTemplate);
    }

    setNewJson(){
        console.log('This not using data anymore. Is only skeleton view');
    }

    setView(num){
        for (let i = 0; i < num; i++) {
            super.setView();
        }
    }
}

class ContentTemplate extends TemplateView{

    constructor(JSONData, targetDOM){
        super(JSONData, targetDOM);
    };

    #strTemplate;

    #genTemplate(objData){
        this.#strTemplate = strTempalate(objData.manufacture, objData.type, objData.image, objData.rentPerDay, objData.description, objData.transmission, objData.capacity, objData.year);
        super._setTemplate(this.#strTemplate);
    }

    setView(){
        console.log('ini dijalnakan lohh');
        this.setBlankView();
        this.getJSONData().forEach(element => {
            this.#genTemplate(element);
            super.setView();
        });
    }
}

const strTempalate = (carName, carType, img, rentPrice, desc, opt, cpty, carYear)=>{
    return `<div class="col-md-3">
    <div class="card">
      
        ${img == undefined ? '<div class="w-100 card-img-top bg-skeleton img-skeleton"></div>' : '<div class="w-100 card-img-top img-skeleton" style="background-image: url('+img+')"></div>'}

      <div class="card-body">
        ${carName == undefined ? '<div class="rounded-pill w-100 bg-skeleton title-skeleton"></div>' : '<h5 class="card-title">'+carName+' / '+carType+'</h5>'}
        ${rentPrice == undefined ? '' : '<h4 class="fw-bold">Rp. '+currencyEncode(rentPrice)+'/hari'+'</h4>'}
        <p class="card-text">
          ${desc == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p1-skeleton"></div>' : '<p class="card-text">'+desc+'</p>'}
          ${cpty == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p2-skeleton"></div>' : '<p class="card-text"><i class="bi bi-people"></i> '+cpty+' Orang'+'</p>'}
          ${opt == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p3-skeleton"></div>' : '<p class="card-text"><i class="bi bi-gear"></i> '+opt+'</p>'}
          ${carYear == undefined ? '<div class="rounded-pill bg-skeleton mb-2 p3-skeleton"></div>' : '<p class="card-text"><i class="bi bi-calendar"></i> Tahun '+carYear+'</p>'}
        </p>
        ${rentPrice == undefined ? '<div class="rounded-pill w-100 bg-skeleton btn-skeleton"></div>' : '<button class="btn btn__mod w-100 btn-success fw-bold">Pilih Mobil</button>'}
      </div>
    </div>
  </div>`;
}

const currencyEncode = num => {
    let strNum = num.toString().split('').reverse();
    let result = [];
    for (let i = 0; i <strNum.length; i++) {
        if(i%3 == 0 && i != 0){
            result.push('.');
            result.push(strNum[i]);
        }else result.push(strNum[i]);
    }
    let res= '';
    result.reverse().forEach(element=>{
        res += element;
    });
    return res;
}

