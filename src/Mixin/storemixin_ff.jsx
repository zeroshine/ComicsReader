var Immutable = require('immutable');
var StoreMixin={
  _getStore:function(){
    var citems=localStorage.getItem('collected');
    console.log(citems);
    this.collectedItems = (citems===null) ? []: JSON.parse(citems);
    var array= this.collectedItems.filter(function(obj){return obj.url===this.indexURL}.bind(this));
    if(array.length>0){
      this.setState({starIsMarked:true});
    }
    var ritems=localStorage.getItem('readed');
    var readedItems=(ritems===null)? []:JSON.parse(ritems);
    for(var i=0;i<readedItems.length;++i){
      if(readedItems[i].url===this.indexURL){
        this.markedItems=Immutable.Set(items.readed[i].markedPayload);  
          // console.log('init this markedItems',this.markedItems.toArray);  
      }
    }
    this._getChapter();    
  },
  
  _saveStoreReaded:function(){
  	var ritems=localStorage.getItem('readed');
    var readedItems=(ritems===null)? []:JSON.parse(ritems);
  	var obj={};
    obj.url=this.indexURL;
    obj.site=this.site;
    obj.iconUrl=this.iconUrl;
    obj.title=this.title;
    obj.markedPayload=this.markedItems.toArray();
    obj.menuItems=this.state.menuItems;
    obj.lastReaded=Object.assign({},this.state.menuItems[this.state.selectedIndex]);
    var array=[];
    for(var i=0;i<readedItems.length;++i){
      if(readedItems[i].url!==this.indexURL){
        array.push(readedItems[i]);    
      }
    }
    array.push(obj);
    readedItems=array;
    localStorage.setItem('readed',JSON.stringify(collectedItems));
    
    var citems=localStorage.getItem('collected');
    var collectedItems=(citems===null)? []:JSON.parse(citems);
    for(var i=0;i<collectedItems.length;++i){
      if(collectedItems[i].url===this.indexURL){
        collectedItems[i].lastReaded=Object.assign({},this.state.menuItems[this.state.selectedIndex]);    
        collectedItems[i].menuItems=this.state.menuItems;
        collectedItems[i].markedPayload=this.markedItems.toArray();
      }
    }
    localStorage.setItem('collected',JSON.stringify(collectedItems));
  },

  _saveStoreCollected:function(){
  	var citems=localStorage.getItem('collected');
    var collectedItems=(citems===null)? []:JSON.parse(citems);
    var obj={};
    obj.url=this.indexURL;
    obj.site=this.site;
    obj.iconUrl=this.iconUrl;
    obj.title=this.title;
    obj.markedPayload=this.markedItems.toArray();
    obj.menuItems=this.state.menuItems;
    obj.lastReaded=Object.assign({},this.state.menuItems[this.state.selectedIndex]);
    var urlInItems=false;
    for(var i=0;i<this.collectedItems.length;++i){
      if(this.collectedItems[i].url===this.indexURL){
        this.collectedItems[i]=obj;
        urlInItems=true;    
      }
    }
    if(!urlInItems){
      this.collectedItems.push(obj);
    }
    collectedItems=this.collectedItems;
    localStorage.setItem('collected',JSON.stringify(collectedItems));
  },

  _removeStoreCollected:function(){
    this.collectedItems=this.collectedItems.filter(function(obj){return obj.url!==this.indexURL}.bind(this));
    localStorage.setItem('collected',JSON.stringify(this.collectedItems));
  }
};

module.exports=StoreMixin;