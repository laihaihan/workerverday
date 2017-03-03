package com.linewell.core.util;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

/**
 * 汉字转拼音操作类，引用pinyin4j-2.5.0.jar包
 * @author JSC
 *
 */
public class PinYinUtil {
    
    /**
    * 汉字转拼音的方法
    * @param name 汉字
    * @return 拼音
    */
    public  String HanyuToPinyin(String name){
    	String pinyinName = "";
        char[] nameChar = name.toCharArray();
        HanyuPinyinOutputFormat defaultFormat = 
                                           new HanyuPinyinOutputFormat();
        defaultFormat.setCaseType(HanyuPinyinCaseType.LOWERCASE);
        defaultFormat.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
        for (int i = 0; i < nameChar.length; i++) {
            if (nameChar[i] > 128) {
                try {
                    pinyinName += PinyinHelper.toHanyuPinyinStringArray
                                           (nameChar[i], defaultFormat)[0];
                } catch (BadHanyuPinyinOutputFormatCombination e) {
                    e.printStackTrace();
                }
            } 
        }
        if(StrUtil.isNull(pinyinName)){
        	pinyinName = name;
        }
        return pinyinName;
    }
 
    public static void main(String[] args) {
        System.out.println(new PinYinUtil().HanyuToPinyin("张建辉"));
    }    
}