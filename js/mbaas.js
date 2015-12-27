// mobile backendアプリとの連携
// http://mb.cloud.nifty.com/doc/current/datastore/basic_usage_javascript.html
var ncmb = new NCMB( "479af5ec8578bc7590a35c30d4a2a4dcf1877d4d74c29d344044eb7ce542ce15", "f212ac2e2c2a745cc125926872d2c8a9e49b388923110fc446f1020c06975989" );
// TomatoClassの作成
var TomatoClass = ncmb.DataStore( "tomato" );

$( function () {
  getTomatoArray();
} );

function getTomatoArray() {
  var tomatoArray = [];

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

function updateTomato() {
  console.log( '=====' );
  console.log( $( '#' + selectedImgId ).data( 'brand' ) );
  console.log( $( '#formComment' ).val() );
  TomatoClass.equalTo( "objectId", selectedImgId )
    .fetchAll()
    .then( function ( results ) {
      results[ 0 ]
        .set( 'comment', $( '#formComment' ).val() )
        .set( 'picture', $( '#picture' ).attr( 'src' ) )
        .set( 'point', Number( $( '#formPoint' ).text() ) + 1 )
        .update()
        .then( function ( tomatoClass ) {
          console.log( 'Updated!' );
          console.log( tomatoClass );
          myModal.forEach( function ( v, i ) {
            v.close();
          } );
          $( '#' + selectedImgId )
            .attr( 'href', 'img/tomato02.png' )
            .animate( {
              width: 100,
              height: 100
            }, 1000 );
        } )
        .catch( function ( err ) {
          console.log( err );
        } );
    } )
    .catch( function ( err ) {
      console.log( err );
    } );
}