function mapDraw( tomatoArray ) {
  console.log( 'Start map draw' );
  draw();
  // google.maps.event.addDomListener( window, 'load', draw );

  var myMap;
  // var tomatoArray =
  // [
  //   {
  //     name: 'ももたろう',
  //     lat: 33.559706,
  //     lng: 133.531079
  // }, {
  //     name: 'ももたろう2',
  //     lat: 33.900000,
  //     lng: 133.000000
  // }, {
  //     name: 'ももたろう3',
  //     lat: 33.900000,
  //     lng: 133.900000
  // }
  //  ];

  function draw() {
    initialize();
    overlayTomato();
  }

  function initialize() {
    // キャンパスの要素を取得する
    var canvas = document.getElementById( 'map-canvas' );

    // 中心の位置座標を指定する
    var latlng = new google.maps.LatLng( 33.559706, 133.531079 );

    // 地図のオプションを設定する
    var mapOptions = {
      zoom: 12, // ズーム値
      center: latlng, // 中心座標 [latlng]
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      navigationControl: true, // ナビゲーションレベルコントローラ（true/"SMALL"/"ZOOM_PAN"）
      mapTypeControl: true, //地図タイプコントローラ (true/"DROPDOWN"）
      scaleControl: true, //スケールの表示
      DClickZoom: true, //ダブルクリックでのズーム操作(true:有効, false:無効）
      scrollwheel: true, //ホイールでのズーム操作(true:有効, false:無効）
    };

    // [canvas]に、[mapOptions]の内容の、地図のインスタンス([map])を作成する
    myMap = new google.maps.Map( canvas, mapOptions );

    // http://phpjavascriptroom.com/?t=ajax&p=googlemapsapiv3_styling
    var stylesArray = [
      {
        elementType: 'geometry',
        featureType: 'landscape.natural',
        stylers: [
          {
            visibility: 'simplified'
          }
    ]
  },
      {
        featureType: '',
        // etc...
  }
];
    myMap.setOptions( {
      styles: stylesArray
    } );
  }

  function overlayTomato() {
    //オーバーレイ設定
    var overlay = new google.maps.OverlayView(); //OverLayオブジェクトの作成

    // D3jsでトマトの画像を表示
    overlay.onAdd = function () {
      var layer = d3.select( "#map-canvas" ).append( "div" ).attr( "class", "SvgOverlay" );
      var svg = layer.append( "svg" );
      tomatoArray.forEach( function ( tomato ) {
        if ( tomato.lat ) {
          // 緯度経度をpx座標に変換
          var point = overlay.getProjection().fromLatLngToDivPixel( new google.maps.LatLng( Number( tomato.lat ), Number( tomato.lng ) ) );
          overlay.draw = function () {
            // imageを表示
            svg
            // .selectAll( ".node" )
            // .data( [ point ] )
              .append( "image" )
              .attr( "class", "node" )
              .attr( "x", function () {
                return point.x;
              } )
              .attr( "y", function () {
                return point.y;
              } )
              .attr( "width", 50 )
              .attr( "height", 50 )
              .attr( "xlink:href", "img/tomato01.png" )
              .attr( "id", tomato.objectId )
              .on( "click", function () {
                alert( tomato.brand );
              } );
            // ブランド名をテキストで表示
            svg
            // .selectAll( "text" )
            // .data( [ point ] ).enter()
              .append( "text" )
              .attr( "x", function () {
                return point.x;
              } )
              .attr( "y", function () {
                return point.y;
              } )
              .attr( "fill", "red" )
              .attr( "font-size", "1rem" )
              .text( tomato.brand );
          };
          overlay.draw();
        } // END of if ( tomato.lat )
        // overlay.setMap( myMap );
      } ); // END of forEach
    }; // END of overlay.onAdd
    overlay.setMap( myMap );
  }
}