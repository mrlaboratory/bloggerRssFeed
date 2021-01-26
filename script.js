var homepage        = "https://www.mrlaboratory.info",
    numposts        = 5, // Number of posts after each download
    snippet         = 200, // The number of words summarizing the excerpt
    showthumbnail   = true, // Show Post image corrected to false if not displayed
    showmeta        = true, // Show author, date posted, label name, comment number corrected to false if not displayed
    showauthor      = true, // Show author corrected to false if not displayed
    showdate        = true, // Show posting date corrected to false if not displayed
    showlabel       = true, // Show label name corrected to false if not displayed
    showcomment     = true, // Show comment number corrected to false if not displayed
    showsnippet     = true, // Show summary corrected to false if not displayed
    showinfo        = true, // Displays the read more button and the share button corrects to false if not displayed
    showreadmore    = true, // Show the read more button corrected to false if not displayed
    showshare       = true, // Show the share button edited to false if not shown
    thumbnail       = "https://4.bp.blogspot.com/-00O66C-eBQs/W0IcokXSnOI/AAAAAAAAL_k/g4KtDm7SkQsoe7_G0vZ_C_nU0Gf_-kyVQCLcBGAs/s1600/safe_image.png", // Ảnh thay thế có thể thay bằng ảnh khác hoặc giữ nguyên
    messagesposts   = "Posts", // Read more
    readmoretext    = "Read more", // Comment 
    commenttext     = "Comments", // Post a comment
    postcommenttext = "Post a Comment", // Share
    sharetext       = "Share",
    facebooktext    = "Share to Facebook", // Share with Facebook
    twittertext     = "Share to Twitter", // Share with Twitter
    pinteresttext   = "Share to Pinterest", // Share with Pinterest
    googletext      = "Email"; // Share with Google+
    //<![CDATA[
    function loadcontent(json) {
      if (json.feed.entry) {
        for (var t = 0; t < json.feed.entry.length; t++) {
          var entry = json.feed.entry[t];
          for (var a = 0; a < entry.link.length; a++) {
            if ('alternate' == entry.link[a].rel) {
              var post_link = entry.link[a].href;
              break
            }
          }
          var post_title = '<div class="post_title"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank">'+ entry.title.$t +'</a></div>';
          if (showthumbnail == true) {
            if ('media$thumbnail' in entry) {
              var post_thumb = '<div class="post_thumb"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank"><img alt="'+ entry.title.$t +'" src='+ entry.media$thumbnail.url.replace('s72-c', 's1600') +' /></a></div>';
            } else {
              post_thumb = '<div class="post_thumb"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank"><img alt="'+ entry.title.$t +'" src='+ thumbnail +' /></a></div>';
            }
          } else {
            post_thumb = '';
          }
          if (showmeta == true) {
            if (showauthor == true) {
              for (var i = 0; i < entry.author.length; i++) {
                if (entry.author[i].uri) {
                  var post_author = '<span class="post_author"><a href='+ entry.author[i].uri.$t +' title="'+ entry.author[i].name.$t +'" target="_blank"><img src='+ entry.author[i].gd$image.src.replace('s512-c', 's40-c') +' alt="'+ entry.author[i].name.$t +'"/><span>'+ entry.author[i].name.$t +'</span></a></span>';
                } else {
                  post_author = '<span class="post_author"><a href="javascript:;" title="'+ entry.author[i].name.$t +'"><img src='+ entry.gd$image.src.replace('s512-c', 's40-c') +' alt="'+ entry.author[i].name.$t +'"/><span>'+ entry.author[i].name.$t +'</span></a></span>';
                }
              }
            } else {
              post_author = '';
            }
            if (showdate == true) {
              var post_date = '<span class="post_date">'+ entry.published.$t.substring(8, 10) + '/' + entry.published.$t.substring(5, 7) + '/' + entry.published.$t.substring(0, 4) +'</span>';
            } else {
              post_date = '';
            }
            if (showlabel == true) {
              if ('category' in entry) {
                for (var r = 0; r < entry.category.length; r++) {
                  var post_label = '<span class="post_label"><a href="'+ homepage +'/search/label/'+ entry.category[r].term +'" title="'+ entry.category[r].term +'" target="_blank">'+ entry.category[r].term +'</a></span>';
                }
              } else {
                post_label = '';
              } 
            } else {
              post_label = '';
            }
            if (showcomment == true) {
              if ('thr$total' in entry) {
                var numofcomments = json.feed.entry[t].thr$total.$t;
                if (numofcomments >= 0) {
                  var post_comment = '<span class="post_comment"><a href='+ post_link + "#comments" +' title="'+ postcommenttext +'" target="_blank">'+ numofcomments + " " + commenttext +'</a></span>';
                } else {
                  post_comment = '<span class="post_comment"><a href='+ post_link + "#comments" +' title="'+ postcommenttext +'" target="_blank">'+ postcommenttext +'</a></span>';
                }
              } else {
                post_comment = '';
              }
            } else {
              post_comment = '';
            }
            var post_meta = '<div class="post_meta">'+ post_author + post_date + post_label + post_comment +'</div>';
          } else {
            post_meta = '';
          }
          if (showsnippet == true) {
            if ('summary' in entry) {
              var post_snippet = entry.summary.$t,
                post_summary = '',
                re = /<\S[^>]*>/g,
                post_snippet = post_snippet.replace(re, '');
              if (post_snippet.length < snippet) {
                post_summary = post_snippet;
              } else {
                post_snippet = post_snippet.substring(0, snippet);
                var quoteEnd = post_snippet.lastIndexOf(' ');
                post_snippet = post_snippet.substring(0, quoteEnd);
                post_summary = post_snippet;
              }
              var post_snippet = '<div class="post_snippet"><p>'+ post_summary + "..." +'</p></div>';
            } else {
              post_snippet = '';
            }
          } else {
            post_snippet = '';
          }
          if (showinfo == true) {
            if (showreadmore == true) {
              var read_more = '<a class="parmalink" href='+ post_link + "#more" +' title="'+ readmoretext +'" target="_blank">'+ readmoretext +'</a>';
            } else {
              read_more = '';
            }
            if (showshare == true) {
              if ('media$thumbnail' in entry) {
                var post_share = ('<div class="post_share"><span class="share_button">'+ sharetext +'</span><div class="post_share_menu"><span class="facebook social-wrapper" data-href="https://www.facebook.com/sharer/sharer.php?u='+ post_link +'" title="'+ facebooktext +'">'+ facebooktext +'</span><span class="twitter social-wrapper" data-href="https://twitter.com/intent/tweet?url='+ post_link +'&text='+ entry.summary.$t.substring(0, snippet) +'" title="'+ twittertext +'">'+ twittertext +'</span><span class="pinterest social-wrapper" data-href="https://www.pinterest.com/pin/create/button/?url='+ post_link +' &description='+ entry.title.$t +'&media='+ entry.media$thumbnail.url.replace("s72-c", "s1600") +'" title="'+ pinteresttext +'">'+ pinteresttext +'</span><span class="google-plus social-wrapper" data-href="https://plus.google.com/share?url='+ post_link +'" title="'+ googletext +'">'+ googletext +'</span></div></div>')
              } else {
                post_share = ('<div class="post_share"><span class="share_button">'+ sharetext +'</span><div class="post_share_menu"><span class="facebook social-wrapper" data-href="https://www.facebook.com/sharer/sharer.php?u='+ post_link +'" title="'+ facebooktext +'">'+ facebooktext +'</span><span class="twitter social-wrapper" data-href="https://twitter.com/intent/tweet?url='+ post_link +'&text='+ entry.summary.$t.substring(0, snippet) +'" title="'+ twittertext +'">'+ twittertext +'</span><span class="pinterest social-wrapper" data-href="https://www.pinterest.com/pin/create/button/?url='+ post_link +' &description='+ entry.title.$t +'&media='+ thumbnail +'" title="'+ pinteresttext +'">'+ pinteresttext +'</span><span class="google-plus social-wrapper" data-href="https://plus.google.com/share?url='+ post_link +'" title="'+ googletext +'">'+ googletext +'</span></div></div>')
              }
            } else {
              post_share = '';
            }
            var post_footer = '<div class="post_footer">'+ read_more + post_share +'</div>'
          } else {
            post_footer = '';
          }
          $('.all_posts .blog-posts').append('<li>'+ post_thumb + post_title + post_meta + post_snippet + post_footer +'</li>');
        }
        $('.post_share').each(function() {
          var d = $(this);
          $('.share_button', d).click(function(n) {
            return n.preventDefault(), $div = $('.post_share_menu', d), $div.toggleClass('opened'), $('.post_share_menu').not($div).removeClass('opened'), !1
          })
        }), $('html').click(function() {
            $('.post_share_menu').removeClass('opened')
        })
        var e = document.getElementsByClassName('social-wrapper'),
        n = e.length;
        for (i = 0; i < n; i++) e[i].addEventListener('click', function(e, n, a) {
          e = this.getAttribute("data-href");
          var i = screen.width / 2 - 200,
            d = screen.height / 2 - 225;
          window.open(e, "popUpWindow", "height=450,width=400,left=" + i + ",top=" + d + ",resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes")
        });
      }
    }
    function loadpost(json) {
      if (json.feed.entry) {
        for (var t = 0; t < json.feed.entry.length; t++) {
          var entry = json.feed.entry[t];
          for (var a = 0; a < entry.link.length; a++) {
            if ('alternate' == entry.link[a].rel) {
              var post_link = entry.link[a].href;
              break
            }
          }
          var post_title = '<div class="post_title"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank">'+ entry.title.$t +'</a></div>';
          if (showthumbnail == true) {
            if ('media$thumbnail' in entry) {
              var post_thumb = '<div class="post_thumb"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank"><img alt="'+ entry.title.$t +'" src='+ entry.media$thumbnail.url.replace('s72-c', 's1600') +' /></a></div>';
            } else {
              post_thumb = '<div class="post_thumb"><a href='+ post_link +' title="'+ entry.title.$t +'" target="_blank"><img alt="'+ entry.title.$t +'" src='+ thumbnail +' /></a></div>';
            }
          } else {
            post_thumb = '';
          }
          if (showmeta == true) {
            if (showauthor == true) {
              for (var i = 0; i < entry.author.length; i++) {
                if (entry.author[i].uri) {
                  var post_author = '<span class="post_author"><a href='+ entry.author[i].uri.$t +' title="'+ entry.author[i].name.$t +'" target="_blank"><img src='+ entry.author[i].gd$image.src.replace('s512-c', 's40-c') +' alt="'+ entry.author[i].name.$t +'"/><span>'+ entry.author[i].name.$t +'</span></a></span>';
                } else {
                  post_author = '<span class="post_author"><a href="javascript:;" title="'+ entry.author[i].name.$t +'"><img src='+ entry.gd$image.src.replace('s512-c', 's40-c') +' alt="'+ entry.author[i].name.$t +'"/><span>'+ entry.author[i].name.$t +'</span></a></span>';
                }
              }
            } else {
              post_author = '';
            }
            if (showdate == true) {
              var post_date = '<span class="post_date">'+ entry.published.$t.substring(8, 10) + '/' + entry.published.$t.substring(5, 7) + '/' + entry.published.$t.substring(0, 4) +'</span>';
            } else {
              post_date = '';
            }
            if (showlabel == true) {
              if ('category' in entry) {
                for (var r = 0; r < entry.category.length; r++) {
                  var post_label = '<span class="post_label"><a href="'+ homepage +'/search/label/'+ entry.category[r].term +'" title="'+ entry.category[r].term +'" target="_blank">'+ entry.category[r].term +'</a></span>';
                }
              } else {
                post_label = '';
              } 
            } else {
              post_label = '';
            }
            if (showcomment == true) {
              if ('thr$total' in entry) {
                var numofcomments = json.feed.entry[t].thr$total.$t;
                if (numofcomments >= 0) {
                  var post_comment = '<span class="post_comment"><a href='+ post_link + "#comments" +' title="'+ postcommenttext +'" target="_blank">'+ numofcomments + " " + commenttext +'</a></span>';
                } else {
                  post_comment = '<span class="post_comment"><a href='+ post_link + "#comments" +' title="'+ postcommenttext +'" target="_blank">'+ postcommenttext +'</a></span>';
                }
              } else {
                post_comment = '';
              }
            } else {
              post_comment = '';
            }
            var post_meta = '<div class="post_meta">'+ post_author + post_date + post_label + post_comment +'</div>';
          } else {
            post_meta = '';
          }
          if (showsnippet == true) {
            if ('summary' in entry) {
              var post_snippet = entry.summary.$t,
                post_summary = '',
                re = /<\S[^>]*>/g,
                post_snippet = post_snippet.replace(re, '');
              if (post_snippet.length < snippet) {
                post_summary = post_snippet;
              } else {
                post_snippet = post_snippet.substring(0, snippet);
                var quoteEnd = post_snippet.lastIndexOf(' ');
                post_snippet = post_snippet.substring(0, quoteEnd);
                post_summary = post_snippet;
              }
              var post_snippet = '<div class="post_snippet"><p>'+ post_summary + "..." +'</p></div>';
            } else {
              post_snippet = '';
            }
          } else {
            post_snippet = '';
          }
          if (showinfo == true) {
            if (showreadmore == true) {
              var read_more = '<a class="parmalink" href='+ post_link + "#more" +' title="'+ readmoretext +'" target="_blank">'+ readmoretext +'</a>';
            } else {
              read_more = '';
            }
            if (showshare == true) {
              if ('media$thumbnail' in entry) {
                var post_share = ('<div class="post_share"><span class="share_button">'+ sharetext +'</span><div class="post_share_menu"><span class="facebook social-wrapper" data-href="https://www.facebook.com/sharer/sharer.php?u='+ post_link +'" title="'+ facebooktext +'">'+ facebooktext +'</span><span class="twitter social-wrapper" data-href="https://twitter.com/intent/tweet?url='+ post_link +'&text='+ entry.summary.$t.substring(0, snippet) +'" title="'+ twittertext +'">'+ twittertext +'</span><span class="pinterest social-wrapper" data-href="https://www.pinterest.com/pin/create/button/?url='+ post_link +' &description='+ entry.title.$t +'&media='+ entry.media$thumbnail.url.replace("s72-c", "s1600") +'" title="'+ pinteresttext +'">'+ pinteresttext +'</span><span class="google-plus social-wrapper" data-href="https://plus.google.com/share?url='+ post_link +'" title="'+ googletext +'">'+ googletext +'</span></div></div>')
              } else {
                post_share = ('<div class="post_share"><span class="share_button">'+ sharetext +'</span><div class="post_share_menu"><span class="facebook social-wrapper" data-href="https://www.facebook.com/sharer/sharer.php?u='+ post_link +'" title="'+ facebooktext +'">'+ facebooktext +'</span><span class="twitter social-wrapper" data-href="https://twitter.com/intent/tweet?url='+ post_link +'&text='+ entry.summary.$t.substring(0, snippet) +'" title="'+ twittertext +'">'+ twittertext +'</span><span class="pinterest social-wrapper" data-href="https://www.pinterest.com/pin/create/button/?url='+ post_link +' &description='+ entry.title.$t +'&media='+ thumbnail +'" title="'+ pinteresttext +'">'+ pinteresttext +'</span><span class="google-plus social-wrapper" data-href="https://plus.google.com/share?url='+ post_link +'" title="'+ googletext +'">'+ googletext +'</span></div></div>')
              }
            } else {
              post_share = '';
            }
            var post_footer = '<div class="post_footer">'+ read_more + post_share +'</div>'
          } else {
            post_footer = '';
          }
          $('.label_posts .blog-posts').append('<li>'+ post_thumb + post_title + post_meta + post_snippet + post_footer +'</li>');
        }
        $('.post_share').each(function() {
          var d = $(this);
          $('.share_button', d).click(function(n) {
            return n.preventDefault(), $div = $('.post_share_menu', d), $div.toggleClass('opened'), $('.post_share_menu').not($div).removeClass('opened'), !1
          })
        }), $('html').click(function() {
            $('.post_share_menu').removeClass('opened')
        })
        var e = document.getElementsByClassName('social-wrapper'),
        n = e.length;
        for (i = 0; i < n; i++) e[i].addEventListener('click', function(e, n, a) {
          e = this.getAttribute("data-href");
          var i = screen.width / 2 - 200,
            d = screen.height / 2 - 225;
          window.open(e, "popUpWindow", "height=450,width=400,left=" + i + ",top=" + d + ",resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes")
        });
      }
    }

    $.ajax({
      type: 'GET',
      url: homepage + '/feeds/posts/summary',
      data: {
        'max-results': numposts,
        'alt': 'json'
      },
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'loadcontent',
      success: function(a) {
        $('.all_posts .blog-posts').removeClass('spinner').removeClass('load')
        var total_posts = a.feed.openSearch$totalResults.$t
        $('.breadcrumb .all_num_posts').append('<span>' + total_posts + ' ' + messagesposts + '</span>')
        $('.all_posts #allposts').attr('value', total_posts)
        for (var k = 0; k < a.feed.category.length; k++) {
          var l = a.feed.category[k].term
          $('.breadcrumb ul').append('<li>' + l + '</li>')
        }
        $('.breadcrumb ul li:first-child').on('click', function() {
          var text = $(this).text()
          $('.breadcrumb button').text(text)
          $('.breadcrumb ul').addClass('hidden')
          $('.all_posts').removeClass('hidden')
          $('.label_posts').addClass('hidden')
          $('.breadcrumb .all_num_posts').show()
          $('.breadcrumb .num_posts').empty()
        })
        $('.breadcrumb ul li:not(:first-child)').each(function() {
          $(this).on('click', function(event) {
            $('.all_posts').addClass('hidden')
            $('.label_posts').removeClass('hidden')
            $('.label_posts .blog-posts').empty()
            $('.label_posts .blog-posts').addClass('spinner').addClass('load')
            var labelname = $(event.target).text()
            $('.breadcrumb button').text(labelname)
            $('.breadcrumb ul').addClass('hidden')
            $('.label_posts .show-posts').removeClass('hidden')
            $('.label_posts #numposts').val(0)
            $('.breadcrumb .num_posts').empty()
            $('.breadcrumb .all_num_posts').hide()
            $.ajax({
              type: 'GET',
              url: homepage + '/feeds/posts/summary/-/' + labelname,
              data: {
                'max-results': numposts,
                'alt': 'json'
              },
              dataType: 'jsonp',
              jsonp: 'callback',
              jsonpCallback: 'loadpost',
              success: function(c) {
                $('.label_posts .blog-posts').removeClass('spinner').removeClass('load')
                var totalposts = c.feed.openSearch$totalResults.$t
                $('.breadcrumb .num_posts').append('<span>' + totalposts + ' ' + messagesposts + '</span>')
                $('.label_posts #allposts').attr('value', totalposts)
                if (totalposts > numposts) {
                  $('.label_posts .load-posts').removeClass('hidden')
                  $(document).off('click', '.label_posts .load-posts').on('click', '.label_posts .load-posts', function(d) {
                    $('.label_posts .loadposts').removeClass('hidden').addClass('spinner').addClass('load')
                    var items = Number($('.label_posts #numposts').val())
                    items = items + numposts
                    if (items < totalposts) {
                      $(d.target).addClass('hidden')
                      $('.label_posts #numposts').val(items)
                      setTimeout(function() {
                        $.ajax({
                          type: 'GET',
                          url: homepage + '/feeds/posts/summary/-/' + labelname,
                          data: {
                            'max-results': numposts,
                            'start-index': items + 1,
                            'alt': 'json'
                          },
                          dataType: 'jsonp',
                          jsonp: 'callback',
                          jsonpCallback: 'loadpost',
                          success: function() {
                            var lastposts = items + numposts
                            if (lastposts < totalposts) {
                              $(d.target).removeClass('hidden')
                              $('.label_posts .loadposts').addClass('hidden').removeClass('spinner').removeClass('load')
                            } else {
                              $(d.target).addClass('hidden')
                              $('.label_posts .loadposts,.label_posts .show-posts').addClass('hidden')
                            }
                          }
                        })
                      }, 500)
                    } else {
                      $(d.target).addClass('hidden')
                      $('.label_posts .loadposts,.label_posts .show-posts').addClass('hidden')
                    }
                  })
                } else {
                  $('.label_posts .show-posts').addClass('hidden')
                }
              }
            })
          })
        })
        if (total_posts > numposts) {
          $('.all_posts .load-posts').removeClass('hidden')
          $(document).off('click', '.all_posts .load-posts').on('click', '.all_posts .load-posts', function(e) {
            $('.all_posts .loadposts').removeClass('hidden').addClass('spinner').addClass('load')
            var items = Number($('.all_posts #numposts').val())
            items = items + numposts
            if (items < total_posts) {
              $(e.target).addClass('hidden')
              $('.all_posts #numposts').val(items)
              setTimeout(function() {
                $.ajax({
                  type: 'GET',
                  url: homepage + '/feeds/posts/summary',
                  data: {
                    'max-results': numposts,
                    'start-index': items + 1,
                    'alt': 'json'
                  },
                  dataType: 'jsonp',
                  jsonp: 'callback',
                  jsonpCallback: 'loadcontent',
                  success: function() {
                    var lastposts = items + numposts
                    if (lastposts < total_posts) {
                      $(e.target).removeClass('hidden')
                      $('.all_posts .loadposts').addClass('hidden').removeClass('spinner').removeClass('load')
                    } else {
                      $(e.target).addClass('hidden')
                      $('.all_posts .loadposts,.all_posts .show-posts').addClass('hidden')
                    }
                  }
                })
              }, 500)
            } else {
              $(e.target).addClass('hidden')
              $('.all_posts .loadposts,.all_posts .show-posts').addClass('hidden')
            }
          })
        } else {
          $('.all_posts .show-posts').addClass('hidden')
        }
      }
    })
    $('.breadcrumb button').click(function(e) {
      e.stopPropagation()
      $('.breadcrumb ul').toggleClass('hidden')
    })
    $('.breadcrumb ul').click(function(e) {
      e.stopPropagation()
    })
    $('html').click(function() {
      $('.breadcrumb ul').addClass('hidden')
    })
    $('.scrollTop').click(function() {
      $('html, body').animate({
        scrollTop: 0
        }, '200')      
    })