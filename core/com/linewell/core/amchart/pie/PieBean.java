package com.linewell.core.amchart.pie;

import java.util.ArrayList;
import java.util.List;

import com.linewell.core.amchart.common.*;

/** 
 * @author linyashan  
 * @Email  lys@linewell.com 
 * @dateTime  Jun 2, 2009 2:33:55 PM 
 * @version  v1.0
 * 类说明 :FLASH饼图中常用对象,可根据需要进行扩展
 */
public class PieBean  extends Settings{
/**
 * 饼图解析XML对象
 */
public Settings settings=new Settings();

/**
 * 饼图对象
 */
public Pie pie=new Pie();

/**
 * 
 */
public Animation animation=new Animation();

/**
 * 
 */
public DataLabels dataLabels=new DataLabels();

/**
 * 
 */
public Group group=new Group();

/**
 * 
 */
public Background background=new Background();

/**
 * 
 */
public Balloon balloon=new Balloon();

/**
 * 
 */
public Legend legend=new Legend();

/**
 * 
 */
public ExportAsImage exportAsImage=new ExportAsImage();

/**
 * 
 */
public ErrorMessages errormessages=new ErrorMessages();

/**
 * 
 */
public Strings strings=new Strings();

/**
 * 
 */
public ContextMenu contextMenu=new ContextMenu();


public List<Labels> list=new ArrayList();

}
