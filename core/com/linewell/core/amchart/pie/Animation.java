package com.linewell.core.amchart.pie;
/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jan 29, 2011 5:11:17 PM 
 * @version  v1.0
 * 类说明 :动画
 */
public class Animation {
    public String start_time="3";
    public String start_effect="strong";
    public String start_radius="";
    public String start_alpha="";
    public boolean sequenced=true;
    public boolean pull_out_on_click=true;
    public String pull_out_time="1.5";
    public String pull_out_effect="bounce";
    public String pull_out_radius="";
    public boolean pull_out_only_one=false;
    
    /**
     * 动画时间
     * <!-- [0] (Number) fly-in time in seconds. Leave 0 to appear instantly -->
     * @return
     */
	public String getStart_time() {
		return start_time;
	}
	
	/**
	 * 动画时间
	 * <!-- [0] (Number) fly-in time in seconds. Leave 0 to appear instantly -->
	 * @param start_time
	 */
	public void setStart_time(String start_time) {
		this.start_time = start_time;
	}
	
	/**
	 * 动画效果
	 * <!-- [bounce] (bounce, regular, strong) -->
	 * @return
	 */
	public String getStart_effect() {
		return start_effect;
	}
	
	/**
	 * 动画效果
	 * <!-- [bounce] (bounce, regular, strong) -->
	 * @param start_effect
	 */
	public void setStart_effect(String start_effect) {
		this.start_effect = start_effect;
	}
	
	/**
	 * <!-- [500%] (Number / Number%) -->
	 * @return
	 */
	public String getStart_radius() {
		return start_radius;
	}
	
	/**
	 * <!-- [500%] (Number / Number%) -->
	 * @param start_radius
	 */
	public void setStart_radius(String start_radius) {
		this.start_radius = start_radius;
	}
	
	/**
	 * <!-- [0] (Number) -->
	 * @return
	 */
	public String getStart_alpha() {
		return start_alpha;
	}
	
	/**
	 * <!-- [0] (Number) -->
	 * @param start_alpha
	 */
	public void setStart_alpha(String start_alpha) {
		this.start_alpha = start_alpha;
	}
	
	/**
	 * <!-- [false] (true / false) Whether the slices should appear all together or one after another --> 
	 * @return
	 */
	public boolean isSequenced() {
		return sequenced;
	}
	
	/**
	 * <!-- [false] (true / false) Whether the slices should appear all together or one after another --> 
	 * @param sequenced
	 */
	public void setSequenced(boolean sequenced) {
		this.sequenced = sequenced;
	}
	
	/**
	 * <!-- [true] (true / false) whether to pull out slices 
	 * when user clicks on them (or on legend entry) -->
	 * @return
	 */
	public boolean isPull_out_on_click() {
		return pull_out_on_click;
	}
	
	/**
	 * <!-- [true] (true / false) whether to pull out slices 
	 * when user clicks on them (or on legend entry) -->
	 * @param pull_out_on_click
	 */
	public void setPull_out_on_click(boolean pull_out_on_click) {
		this.pull_out_on_click = pull_out_on_click;
	}
	
	/**
	 * 点击饼图后动画时间
	 * <!-- [0] (number) pull-out time (then user clicks on the slice) -->
	 * @return
	 */
	public String getPull_out_time() {
		return pull_out_time;
	}
	
	/**
	 * 点击饼图后动画时间
	 * <!-- [0] (number) pull-out time (then user clicks on the slice) -->
	 * @param pull_out_time
	 */
	public void setPull_out_time(String pull_out_time) {
		this.pull_out_time = pull_out_time;
	}
	
	/**
	 * 点击饼图后动画效果
	 * <!-- [bounce] (bounce, regular, strong) -->
	 * @return
	 */
	public String getPull_out_effect() {
		return pull_out_effect;
	}
	
	/**
	 * 点击饼图后动画效果
	 * <!-- [bounce] (bounce, regular, strong) -->
	 * @param pull_out_effect
	 */
	public void setPull_out_effect(String pull_out_effect) {
		this.pull_out_effect = pull_out_effect;
	}
	
	/**
	 * <!-- [20%] (Number / Number%) how far pie slices should be pulled-out then user clicks on them -->
	 * @return
	 */
	public String getPull_out_radius() {
		return pull_out_radius;
	}
	
	/**
	 * <!-- [20%] (Number / Number%) how far pie slices should be pulled-out then user clicks on them -->
	 * @param pull_out_radius
	 */
	public void setPull_out_radius(String pull_out_radius) {
		this.pull_out_radius = pull_out_radius;
	}
	
	/**
	 * <!-- [false] (true / false) if set to true, when you click on any slice,
	 *  all other slices will be pushed in -->        
	 * @return
	 */
	public boolean isPull_out_only_one() {
		return pull_out_only_one;
	}
	
	/**
	 *  <!-- [false] (true / false) if set to true, when you click on any slice,
	 *  all other slices will be pushed in -->  
	 * @param pull_out_only_one
	 */
	public void setPull_out_only_one(boolean pull_out_only_one) {
		this.pull_out_only_one = pull_out_only_one;
	}
}
