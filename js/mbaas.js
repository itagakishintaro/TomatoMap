// mobile backendアプリとの連携
var ncmb = new NCMB( "7d85a8b1dcf0d9fd80dcdd06183e77fb2b5cb913c8abc522182a245ced11afb9", "ffa91e51db0c577ae40223576992e551ccf1e8db73f4f45c061deccd9da9da42" );

// TomatoClassの作成
var TomatoClass = ncmb.DataStore( "TomatoClass" );
// TomatoClassへの入出力
TomatoClass.equalTo( "message", "Hello, NCMB!" )
  .fetchAll()
  .then( function ( results ) {
    if ( results[ 0 ] != null ) {
      alert( results[ 0 ].get( "message" ) );
    } else {
      var tomatoClass = new TomatoClass();
      tomatoClass.set( "message", "Hello, NCMB!" );
      tomatoClass.save()
        .then( function () {
          alert( "message is saved." );
        } )
        .catch( function ( err ) {
          alert( err.text );
        } );
    }
  } )
  .catch( function ( err ) {
    alert( err.text );
  } );