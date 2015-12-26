// mobile backendアプリとの連携
var ncmb = new NCMB( "479af5ec8578bc7590a35c30d4a2a4dcf1877d4d74c29d344044eb7ce542ce15", "f212ac2e2c2a745cc125926872d2c8a9e49b388923110fc446f1020c06975989" );

$( function () {
  getTomatoArray();
} );

function getTomatoArray() {
  var tomatoArray = [];
  // TomatoClassの作成
  var TomatoClass = ncmb.DataStore( "tomato" );
  // TomatoClassへの入出力
  TomatoClass
    .fetchAll()
    .then( function ( results ) {
      results.forEach( function ( object ) {
        tomatoArray.push( object );
      } );
      console.log( 'Gotten tomatoArray from mBaaS' );
      console.log( tomatoArray );
      mapDraw( tomatoArray );

    } )
    .catch( function ( err ) {
      alert( err.text );
    } );
}