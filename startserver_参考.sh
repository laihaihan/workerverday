#!/bin/sh
# ---------------------------------------------------------------------------
# The TongWeb Server Start Script
#
# Environment Variable Prequisites
#
#   JAVA_HOME       Point at your Java Development Kit installation. If you
#                   don't want to use the JDK specified by JAVA_HOME, define
#                   JDKDIR in this script.
#
#
# Configurable Variables in this Script
#
#   JDKDIR          Point at your Java Development Kit installation. If not
#                   specified, JAVA_HOME will be used.
#
#   JAVA_OPTS       Additional java arguments.
#
# ---------------------------------------------------------------------------
export JAVA_HOME=/root/下载/jdk1.6.0_38/
export LC_ALL="zh_CN.GBK"
export LANG="zh_CN.GBK"
DIRNAME=`pwd` 
if [ "${JAVA_HOME}" = "" ] ; then
 	echo ERROR: JAVA_HOME was not setted
	exit 1
fi
JAVA=${JAVA_HOME}/bin/java
if [ ! "${JAVA_HOME}/lib/tools.jar" ] ; then   
	echo ERROR: JAVA_HOME directory is wrong.  
        exit 1
fi
JAVAC_JAR=${JAVA_HOME}/lib/tools.jar
TWNS_HOME=${TWHOMEDIR}
if [ "${TWHOMEDIR}" = "" ] ; then
	TWNS_HOME=${DIRNAME}/..
fi

if [ "${OSTYPE}" = "cygwin32" ] ; then
    PS=\;
else
    PS=:
fi

SHARED_PATCHES=
LANUCH_PATCHES=

if [ -f "${TWNS_HOME}/patches/patch_script.sh" ] ; then   
	. ${TWNS_HOME}/patches/patch_script.sh
fi


TW_OPTS=" -Dtongweb.root=${TWNS_HOME}"
TW_OPTS="${TW_OPTS} -Djava.awt.headless=true"
TW_OPTS="${TW_OPTS} -Dtongweb.serverName=server"
TW_OPTS="${TW_OPTS} -Dtongweb.verbose=true"
TW_OPTS="${TW_OPTS} -Dtongweb.restart.interval=1"
TW_OPTS="${TW_OPTS} -Djava.rmi.server.RMIClassLoaderSpi=com.tongweb.server.TongWebRMIClassLoader"
TW_OPTS="${TW_OPTS} -Djavax.net.ssl.keyStore=${TWNS_HOME}/config/server.keystore"
TW_OPTS="${TW_OPTS} -Djavax.net.ssl.trustStore=${TWNS_HOME}/config/cacerts"
TW_OPTS="${TW_OPTS} -Djavax.net.ssl.keyStorePassword=changeit"
TW_OPTS="${TW_OPTS} -Djavax.net.ssl.trustStorePassword=changeit"
TW_OPTS="${TW_OPTS} -Djava.security.policy=${TWNS_HOME}/config/server.policy"
TW_OPTS="${TW_OPTS} -Dtongweb.environmentFactory=com.tongweb.config.serverbeans.AppserverConfigEnvironmentFactory"
TW_OPTS="${TW_OPTS} -Dtongweb.pluggable.repository=com.tongweb.advance.server.pluggable.EEPluggableFeatureImpl"
TW_OPTS="${TW_OPTS} -Dtongweb.configFile=${TWNS_HOME}/config"
TW_OPTS="${TW_OPTS} -Dtongweb.identity=false"
TW_OPTS="${TW_OPTS} -Dtongweb.taglibs=twns-jstl.jar,jsf-impl.jar"
TW_OPTS="${TW_OPTS} -Dtongweb.taglisteners=jsf-impl.jar"
TW_OPTS="${TW_OPTS} -Dtongweb.classloader.sharedChainJars=${SHARED_PATCHES}${TWNS_HOME}/lib/ant/lib/ant.jar"
TW_OPTS="${TW_OPTS} -Dtongweb.classloader.optionalOverrideableChain=webservices-rt.jar,webservices-tools.jar"
TW_OPTS="${TW_OPTS} -Dtongweb.classloader.excludesList=admin-cli.jar,twns-anttask.jar,twns-el.jar"
TW_OPTS="${TW_OPTS} -Dtongweb.classloader.appserverChainJars=admin-cli.jar,j2ee-svc.jar"
TW_OPTS="${TW_OPTS} -Dcom.tongweb.server.logging.max_history_files=20"

JAVA_OPTS="-Xmx512m"
JAVA_OPTS="${JAVA_OPTS} -XX:+UnlockDiagnosticVMOptions -XX:MaxPermSize=192m -XX:NewRatio=2 -XX:+LogVMOutput -XX:LogFile=${TWNS_HOME}/logs/jvm.log"
JAVA_OPTS="${JAVA_OPTS} -server"
JAVA_OPTS="${JAVA_OPTS} -Dsun.rmi.dgc.client.gcInterval=3600000"
JAVA_OPTS="${JAVA_OPTS} -Dsun.rmi.dgc.server.gcInterval=3600000"
JAVA_OPTS="${JAVA_OPTS} -Djava.util.logging.manager=com.tongweb.server.logging.ServerLogManager"
JAVA_OPTS="${JAVA_OPTS} -Djava.library.path=${TWNS_HOME}/lib:${JAVA_HOME}/bin:${TWNS_HOME}/bin"
JAVA_OPTS="${JAVA_OPTS} -Djava.endorsed.dirs=${TWNS_HOME}/lib/endorsed"
JAVA_OPTS="${JAVA_OPTS} -Djavax.management.builder.initial=com.tongweb.advance.admin.AppServerMBeanServerBuilder"
JAVA_OPTS="${JAVA_OPTS} -Djava.security.auth.login.config=${TWNS_HOME}/config/login.conf"
JAVA_OPTS="${JAVA_OPTS} -Djmx.invoke.getters=true"
JAVA_OPTS="${JAVA_OPTS} -Djava.ext.dirs=${JAVA_HOME}/lib/ext:${JAVA_HOME}/jre/lib/ext:${TWNS_HOME}/lib/ext:${TWNS_HOME}/javadb/lib"


TWNS_CLASSPATH="${JAVAC_JAR}"
TWNS_CLASSPATH="${TWNS_CLASSPATH}:${LANUCH_PATCHES}${TWNS_HOME}/lib/launch.jar:${TWNS_HOME}/lib/license.jar"


START_CLASS=com.tongweb.server.PELaunch


# parse arguments
ACTION=start

if [ "$1" = "start" ] ; then  
ACTION=start
elif [ "$1" = "debug" ] ; then 
ACTION=debug
elif [ "$1" = "restart" ] ; then
ACTION=restart
fi

#execute
if [ "${ACTION}" = "start" ] ; then   
   exec ${JAVA} -classpath ${TWNS_CLASSPATH} ${JAVA_OPTS} ${TW_OPTS} ${START_CLASS} start
elif [ "${ACTION}" = "debug" ] ; then
   exec ${JAVA} -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address="$2" -classpath ${TWNS_CLASSPATH} ${JAVA_OPTS} ${TW_OPTS} ${START_CLASS} start
elif [ "${ACTION}" = "restart" ] ; then
   exec ${JAVA} -DJAVA_HOME=${JAVA_HOME} -Dtongweb.root=${TWNS_HOME} -classpath ${TWNS_HOME}/lib/launch.jar com.tongweb.server.MonitorLaunch start
fi
