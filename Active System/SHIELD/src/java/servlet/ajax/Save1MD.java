/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.MissionDAO;
import entity.Area;
import entity.Mission;
import entity.Task;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 *
 * @author Dan Torres
 */
public class Save1MD extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet SaveMD</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet SaveMD at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Save Mission Details from SHIELD 1
        HttpSession session = request.getSession();
        int editorID = (int)session.getAttribute("userID");
        
        Mission mson = new Mission();
        mson.setId(Integer.parseInt(request.getParameter("id")));
        mson.setUserID(editorID);
        mson.setTitle(request.getParameter("title"));
        mson.setObjective(request.getParameter("objective"));
        mson.setSituation(request.getParameter("situation"));
        mson.setCommanderIntent(request.getParameter("commanderintent"));
        mson.setConceptOfOperation(request.getParameter("conceptofoperation"));
        mson.setThemeStress(request.getParameter("themestress"));
        mson.setThemeAvoid(request.getParameter("themeavoid"));
        
        ArrayList<Task> taskList = new ArrayList<Task>();
        JSONArray taskJArr = new JSONArray(request.getParameter("tasklist"));
        
        for(Object j : taskJArr){
            JSONObject jsob = new JSONObject(j.toString());
            String element = jsob.getString("psyopsElement");
            String desc = jsob.getString("desc");
            Task task = new Task(0, element, desc);
            taskList.add(task);
        }
        mson.setTaskList(taskList);
        
        MissionDAO msonDAO = new MissionDAO();
        boolean success = msonDAO.UpdateMission(editorID, mson);
        
        int missionStatus = (int)session.getAttribute("missionStatus");
        System.out.println(missionStatus);
        if(missionStatus == 1){
            missionStatus = msonDAO.AdvanceMissionStatus(mson.getId());
            session.setAttribute("missionStatus", missionStatus);
        }
        
        JSONObject obj = new JSONObject();
        obj.put("success", success);
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(obj.toString());
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
