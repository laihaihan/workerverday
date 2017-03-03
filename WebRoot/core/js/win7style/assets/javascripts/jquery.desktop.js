//
// Kick things off.
//
jQuery(document).ready(function() {
	JQD.go();
});
/*Download by http://sc.xueit.com*/
//
// Namespace - Module Pattern.
//
var JQD = (function($, window, undefined) {
	// Expose innards of JQD.
	return {
		go: function() {
			for (var i in JQD.init) {
				JQD.init[i]();
			}
		},
		init: {
			frame_breaker: function() {
				if (window.location !== window.top.location) {
					window.top.location = window.location;
				}
			},
			
			//
			// Initialize the desktop.
			//
			desktop: function() {
				// Cancel mousedown, right-click.
				$(document).mousedown(function(ev) {
					if (!$(ev.target).closest('a').length) {
						JQD.util.clear_active();
						ev.preventDefault();
						ev.stopPropagation();
					}
				}).bind('contextmenu', function() {
					var ev = window.event;
					$('#mm').menu('show',{
						left:ev.clientX,
						top:ev.clientY
					});
					return false;
				});

				// Relative or remote links?
				$('a').live('click', function(ev) {
					var url = $(this).attr('href');
					this.blur();
					if (url.match(/^#/)) {
						ev.preventDefault();
						ev.stopPropagation();
					}
					else {
						$(this).attr('target', '_blank');
					}
				});

				// Make top menus active.
				$('a.menu_trigger').live('mousedown', function() {
					if ($(this).next('ul.menu').is(':hidden')) {
						JQD.util.clear_active();
						$(this).addClass('active').next('ul.menu').show();
					}
					else {
						JQD.util.clear_active();
					}
				}).live('mouseenter', function() {
					// Transfer focus, if already open.
					if ($('ul.menu').is(':visible')) {
						JQD.util.clear_active();
						$(this).addClass('active').next('ul.menu').show();
					}
				});

				// Desktop icons.
				$('a.easyui-draggable').live('mousedown', function() {
					// Highlight the icon.
					JQD.util.clear_active();
					$(this).addClass('active');
				}).live('dblclick', function() {
					// Get the link's target.
					var x = $(this).attr('href');
					var y = $(x).find('a').attr('href');

					// Show the taskbar button.
					if ($(x).is(':hidden')) {
						$(x).remove().appendTo('#dock');
						$(x).show('fast');
					}

					// Bring window to front.
					JQD.util.window_flat();
					$(y).addClass('window_stack').show();
				}).live('contextmenu', function() {//右键菜单事件
					$('#mm').menu('hide',{});
					curContextmenuId = $(this).attr('href').replace('#','');
					var ev = window.event; 
					$('#desktopShortcut').menu('show',{
						left:ev.clientX,
						top:ev.clientY
					});
					
					$('#mm').menu('hide',{});
					return false;
				}).live('mousedown ', function() {
					curContextmenuId = $(this).attr('href').replace('#','');
				});

				// startMenu icons.
				$('a.startIcon').live('mousedown', function() {
					// Highlight the icon.
					//alert('1');
					
				}).live('click', function() {
					// Get the link's target.
					var x = $(this).attr('href');
					var y = $(x).find('a').attr('href');

					// Show the taskbar button.
					if ($(x).is(':hidden')) {
						$(x).remove().appendTo('#dock');
						$(x).show('fast');
					}

					// Bring window to front.
					JQD.util.window_flat();
					$(y).addClass('window_stack').show();
				}).live('mouseenter', function() {
					//$(this).die('mouseenter').draggable({
					//	revert: true,
					//	containment: 'parent'
					//});
				});


				// Taskbar buttons.
				$('#dock a').live('click', function() {
					// Get the link's target.
					var x = $($(this).attr('href'));

					// Hide, if visible.
					if (x.is(':visible')) {
						x.hide();
					}
					else {
						// Bring window to front.
						JQD.util.window_flat();
						x.show().addClass('window_stack');
					}
				});

				// Make windows movable.
				$('div.deskwindow').live('mousedown', function() {
					// Bring window to front.
					JQD.util.window_flat();
					$(this).addClass('window_stack');
				}).live('mouseenter', function() {
					$(this).die('mouseenter').draggable({
						// Confine to desktop.
						// Movable via top bar only.
						cancel: 'a',
						containment: 'parent',
						handle: 'div.window_top'
					}).resizable({
						containment: 'parent',
						minWidth: 400,
						minHeight: 200
					});

				// Double-click top bar to resize, ala Windows OS.
				}).find('div.window_top').live('dblclick', function() {
					JQD.util.window_resize(this);

				// Double click top bar icon to close, ala Windows OS.
				}).find('img').live('dblclick', function() {
					// Traverse to the close button, and hide its taskbar button.
					$($(this).closest('div.window_top').find('a.window_close').attr('href')).hide('fast');

					// Close the window itself.
					$(this).closest('div.deskwindow').hide();

					// Stop propagation to deskwindow's top bar.
					return false;
				});

				// Minimize the window.
				$('a.window_min').live('click', function() {
					$(this).closest('div.deskwindow').hide();
				});

				// Maximize or restore the window.
				$('a.window_resize').live('click', function() {
					JQD.util.window_resize(this);
				});

				// Close the window.
				$('a.window_close').live('click', function() {
					$(this).closest('div.deskwindow').hide();
					$($(this).attr('href')).hide('fast');
				});

				// Show desktop button, ala Windows OS.
				$('#show_desktop').live('click', function() {
					// If any windows are visible, hide all.
					if ($('div.deskwindow:visible').length) {
						$('div.deskwindow').hide();
					}
					else {
						// Otherwise, reveal hidden windows that are open.
						$('#dock li:visible a').each(function() {
							$($(this).attr('href')).show();
						});
					}
				});

				$('table.data').each(function() {
					// Add zebra striping, ala Mac OS X.
					$(this).find('tbody tr:odd').addClass('zebra');
				}).find('tr').live('mousedown', function() {
					// Highlight row, ala Mac OS X.
					$(this).closest('tr').addClass('active');
				});
			},
			wallpaper: function() {
				// Add wallpaper last, to prevent blocking.
				if ($('#desktop').length) {
					if(null != curpicpath && curpicpath.length > 5){
						$('body').prepend('<img onClick="hiddenStartMenu();" id="wallpaper" class="abs" src="' + curpicpath + '" />');
					}else{
						$('body').prepend('<img onClick="hiddenStartMenu();" id="wallpaper" class="abs" src="'+appPath+'/core/js/win7style/assets/images/desktop/sys/wallpaper.jpg" />');
					}
				}
			}
		},
		util: {
			//
			// Clear active states, hide menus.
			//
			clear_active: function() {
				$('a.active, tr.active').removeClass('active');
				$('ul.menu').hide();
			},
			//
			// Zero out window z-index.
			//
			window_flat: function() {
				$('div.deskwindow').removeClass('window_stack');
			},
			//
			// Resize modal window.
			//
			window_resize: function(el) {
				// Nearest parent window.
				var win = $(el).closest('div.deskwindow');

				// Is it maximized already?
				if (win.hasClass('window_full')) {
					// Restore window position.
					win.removeClass('window_full').css({
						'top': win.attr('data-t'),
						'left': win.attr('data-l'),
						'right': win.attr('data-r'),
						'bottom': win.attr('data-b'),
						'width': win.attr('data-w'),
						'height': win.attr('data-h')
					});
				}
				else {
					win.attr({
						// Save window position.
						'data-t': win.css('top'),
						'data-l': win.css('left'),
						'data-r': win.css('right'),
						'data-b': win.css('bottom'),
						'data-w': win.css('width'),
						'data-h': win.css('height')
					}).addClass('window_full').css({
						// Maximize dimensions.
						'top': '0',
						'left': '0',
						'right': '0',
						'bottom': '0',
						'width': '100%',
						'height': '100%'
					});
				}

				// Bring window to front.
				JQD.util.window_flat();
				win.addClass('window_stack');
			}
		}
	};
// Pass in jQuery.
})(jQuery, this);