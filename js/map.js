function mapDraw( tomatoArray ) {
  var myMap;

  console.log( 'BEGIN map draw' );
  initialize();
  overlayTomato();
  console.log( 'END map draw' );

  console.log( 'BEGIN add click event to image' );
  google.maps.event.addListenerOnce( myMap, 'idle', addClickEventToImage );
  console.log( 'END add click event to image' );

  function initialize() {
    // キャンパスの要素を取得する
    var canvas = document.getElementById( 'map-canvas' );

    // 中心の位置座標を指定する
    var latlng = new google.maps.LatLng( 33.539706, 133.531079 );

    // 地図のオプションを設定する
    var mapOptions = {
      zoom: 11, // ズーム値
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

    // https://developers.google.com/maps/documentation/javascript/styling
    var styles = [
      {
        stylers: [
          {
            hue: "#00ffe6"
          },
          {
            saturation: -20
          }
          ]
        }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            lightness: 100
          },
          {
            visibility: "symplified"
          }
          ]
        }, {
        featureType: "road",
        elementType: "labels",
        stylers: [
          {
            visibility: "off"
          }
          ]
        }
      ];
    myMap.setOptions( {
      styles: styles
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
            // .selectAll( ".tomato-image" )
            // .data( [ point ] )
              .append( "image" )
              .attr( "class", "tomato-image" )
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
              .attr( "data-brand", tomato.brand )
              .attr( "data-producer", tomato.producer )
              .attr( "data-address", tomato.address )
              .attr( "data-comment", function () {
                if ( tomato.comment ) {
                  return tomato.comment;
                } else {
                  return '';
                }
              } )
              .attr( "data-picture", function () {
                if ( tomato.picture ) {
                  return tomato.picture;
                } else {
                  return '';
                }
              } );
            // .on( "click", function () {
            //   alert( tomato.brand );
            // } );
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